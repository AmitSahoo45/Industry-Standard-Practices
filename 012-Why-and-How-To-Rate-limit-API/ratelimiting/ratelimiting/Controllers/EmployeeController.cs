using Microsoft.AspNetCore.Mvc;
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

        // The constructor should be public so that the DI container can instantiate it
        public EmployeeController(ApplicationDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetAllEmployees()
        {
            return await _dbContext.Employees.ToListAsync();
        }
    }
}