using Microsoft.EntityFrameworkCore;
using ratelimiting.Database;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
builder.Services.AddControllers();

var app = builder.Build();

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
    } catch (Exception ex)
    {
        Console.WriteLine($"Error seeding database: {ex.Message}");
    }
});

app.MapControllers();
app.Run();
