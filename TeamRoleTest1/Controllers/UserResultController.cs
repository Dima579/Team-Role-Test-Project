using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using TeamRoleTest1.Data;
using TeamRoleTest1.Models;

namespace TeamRoleTest1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserResultController : ControllerBase

    {
        private readonly ApplicationDbContext _db;
        private readonly ILogger<ApplicationDbContext> _logger;

        public UserResultController(ApplicationDbContext db, ILogger<ApplicationDbContext> logger)
        {
            {
                _db = db;
                _logger = logger;
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserResult([FromBody] UserResult model) 
        {
            if (model == null) {return BadRequest();}
            else if (!ModelState.IsValid) {return BadRequest(ModelState);}
            else 
            {
                _db.Results.Add(model);
                await _db.SaveChangesAsync();
                return Ok(model);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserResults()
        {
            var results = await _db.Results.ToListAsync();
            return Ok(results);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserResultById(int Id)
        {
            var result = await _db.Results.FindAsync(Id);

            if (result == null) {return NotFound();}
            else {return Ok(result);}
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserResultById(int Id)
        {
            var result = await _db.Results.FindAsync(Id);
            if (result == null) {return NotFound();} 
            else 
            {
                _db.Remove(result);
                await _db.SaveChangesAsync();
                return Ok("Result Successfully deleted.");
            }
        }
    }
}
