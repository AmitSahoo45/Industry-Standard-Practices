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
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _dbContext;

        public EmployeeController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // Get all employees using "Fixed Window" rate limiting
        // api route
        //[Authorize]
        //[EnableRateLimiting("FixedWindowPolicy")]
        [HttpGet("fixed-window")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees_Fixed_Window()
        {
            return await _dbContext.Employees.ToListAsync();
        }

        // Get all employees using "Sliding Window" rate limiting
        [Authorize]
        [EnableRateLimiting("SlidingWindowPolicy")]
        [HttpGet("sliding-window")]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees_Sliding_Window()
        {
            return await _dbContext.Employees.ToListAsync();
        }
    }
}