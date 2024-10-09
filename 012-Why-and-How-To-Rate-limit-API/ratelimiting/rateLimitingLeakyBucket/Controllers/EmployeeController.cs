using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;
using ratelimiting.Database;
using ratelimiting.Models;

namespace ratelimiting.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public EmployeeController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Get all employees using "Leaky Bucket" rate limiting
        [HttpGet]
        [EnableRateLimiting("LeakyBucketPolicy")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees(int pageSize = 10, int pageNumber = 1)
        {
            return await _dbContext.Employees
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }
    }
}