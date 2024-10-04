namespace ratelimiting.Helper
{
    public class Functions
    {
        public static string GetPartitionKey(HttpContext context)
        {
            return context.User.Identity?.Name ?? context.Connection.RemoteIpAddress?.ToString() ?? "UnknownIP";
        }
    }
}