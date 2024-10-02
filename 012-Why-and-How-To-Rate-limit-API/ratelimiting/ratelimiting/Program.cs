using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ratelimiting.Database;
using System.Text;
using System.Threading.RateLimiting;
using Microsoft.AspNetCore.RateLimiting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddIdentity<IdentityUser, IdentityRole>(options =>
{
    options.Password.RequireDigit = false;
    options.Password.RequiredLength = 6;
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequireUppercase = false;
    options.Password.RequireLowercase = true;
})
.AddEntityFrameworkStores<ApplicationDbContext>()
.AddDefaultTokenProviders();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"], 
        ValidAudience = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])) 
    };
});

builder.Services.AddControllers();

// This is the rate limiting middleware. 
// We are applying this globally. 
// By setting options.GlobalLimiter, you define a rate limiter that applies to all requests globally.
// The partitionKey can be any string since we're applying the same limit to all requests.
//builder.Services.AddRateLimiter(options =>
//{
//    options.GlobalLimiter = PartitionedRateLimiter.Create<HttpContext, string>(httpContext =>
//        RateLimitPartition.GetFixedWindowLimiter(
//            partitionKey: "GlobalPolicy", 
//            factory: _ => new FixedWindowRateLimiterOptions
//            {
//                Window = TimeSpan.FromMinutes(1),
//                PermitLimit = 2,
//                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
//                QueueLimit = 1,
//            }));

//    // The response when rate limit is exceeded
//    options.OnRejected = async (context, cancellationToken) =>
//    {
//        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
//        await context.HttpContext.Response.WriteAsync("Too many requests. Please try again later.", cancellationToken);
//    };
//});

// implementing fixed window rate limiting of specific route 
builder.Services.AddRateLimiter(options =>
{
    // Define a named policy called "FixedWindowPolicy"
    options.AddPolicy("FixedWindowPolicy", context =>
        RateLimitPartition.GetFixedWindowLimiter(
            partitionKey: context.Connection.RemoteIpAddress?.ToString() ?? "UnknownIP",
            factory: key => new FixedWindowRateLimiterOptions
            {
                Window = TimeSpan.FromMinutes(1),
                PermitLimit = 2,
                QueueProcessingOrder = QueueProcessingOrder.OldestFirst,
                QueueLimit = 1,
            }));

    // The response when the rate limit is exceeded
    options.OnRejected = async (context, cancellationToken) =>
    {
        context.HttpContext.Response.StatusCode = StatusCodes.Status429TooManyRequests;
        await context.HttpContext.Response.WriteAsync("Too many requests. Please try again later.", cancellationToken);
    };
});
// Explaination: Instead of using the global rate limiter, we are using a named policy called "FixedWindowPolicy". 
// you are defining a named policy - "options.AddPolicy". This allows you to apply rate limiting selectively to specific endpoints.
// The AddPolicy is defining a named rate-limiting policy called "FixedWindowPolicy".
// The partitionKey uses the client's IP address to uniquely identify the requester. This ensures that rate limiting is applied per IP.
// The `FixedWindowRateLimiterOptions` configures the fixed window size, permit limit, and queue settings.


var app = builder.Build();

// This way we are adding the rate limiting middleware to the pipeline.
// This ensures rate limiting is applied to all requests.
// The middleware will prevent excessive requests by clients and respond with a 429 status code when the limit is exceeded.
app.UseRateLimiter();

app.Lifetime.ApplicationStarted.Register(() =>
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

    try
    {
        if (!context.Employees.Any())
        {
            string sqlFilePath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "seedData.sql");
            string sqlScript = File.ReadAllText(sqlFilePath);
            context.Database.ExecuteSqlRaw(sqlScript);
        }
        else Console.WriteLine("Database already populated, skipping seeding.");
    }
    catch (Exception ex)
    {
        Console.WriteLine($"Error seeding database: {ex.Message}");
    }
});

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.Run();