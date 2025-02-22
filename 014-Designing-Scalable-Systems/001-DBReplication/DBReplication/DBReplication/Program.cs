using DBReplication.DataAccess;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();

builder.Services.AddDbContext<PublisherContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PublisherDb")));

builder.Services.AddDbContext<SubscriberContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SubscriberDb")));

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Orders}/{action=Index}/{id?}");

app.Run();
