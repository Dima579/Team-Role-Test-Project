using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata.Ecma335;
using TeamRoleTest1.Data;
using TeamRoleTest1.Models;
using TeamRoleTest1.Services;
using TeamRoleTest1.DTOs;

namespace TeamRoleTest1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserResultController : ControllerBase

    {
        private readonly ILogger<ApplicationDbContext> _logger;
        private readonly IUserResultservices _services;

        public UserResultController(ILogger<ApplicationDbContext> logger, IUserResultservices services)
        {
            _logger = logger;
            _services = services;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUserResults()
        {
            var result = await _services.GetAllUsers();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserResultById(int Id)
        { 
            var result = await _services.GetUserById(Id);
            if(result == null) {return NotFound();}
            return Ok(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserResult([FromBody] UserResultDTO model)
        {
            var result = await _services.CreateUser(model);
            return CreatedAtAction(nameof(GetUserResultById), new { id = result.Id}, result);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserResultById(int Id)
        {
            var result = await _services.DeleteUser(Id);
            if(result == false) {return NotFound();}
            return NoContent();
        }

    }
}
