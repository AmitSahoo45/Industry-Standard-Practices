# Implementing Rate Limiting in a Route-Specific Manner
- In the previous section, we implemented rate limiting in a global manner. In this section, we will implement rate limiting in a route-specific manner. This means that we will apply rate limiting to a specific route only.

- To implement rate limiting in a route-specific manner, we will use the same approach as we did in the previous section. The only difference is that we will apply rate limiting to a specific route only.

For that purpose, we will create a named policy using options.AddPolicy method. This allows you to apply rate limiting selectively to specific endpoints.

Here is the code to implement rate limiting in a route-specific manner:

```csharp
// remove the global rate limiting policy
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
```

In the above code, we have removed the global rate limiting policy and defined a named policy called "FixedWindowPolicy". This policy applies rate limiting to a specific route only.


Next, we will apply this policy to a specific route. Here is the code to apply the "FixedWindowPolicy" policy to a specific route:

```csharp
[EnableRateLimiting("FixedWindowPolicy")]
[HttpGet]
public IEnumerable<WeatherForecast> Get()
{
    return Enumerable.Range(1, 5).Select(index => new WeatherForecast
    {
        Date = DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
        TemperatureC = Random.Shared.Next(-20, 55),
        Summary = Summaries[Random.Shared.Next(Summaries.Length)]
    })
    .ToArray();
}
```