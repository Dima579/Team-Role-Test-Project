using Microsoft.EntityFrameworkCore;
using TeamRoleTest1.Data;
using TeamRoleTest1.DTOs;
using TeamRoleTest1.Models;

namespace TeamRoleTest1.Services
{
    public class UserServices : IUserResultservices
    {
        private readonly ApplicationDbContext _context;

        public UserServices(ApplicationDbContext context) { _context = context; }

        public async Task<List<UserResultDTO>> GetAllUsers()
        {
            return await _context.Results.Select(result => new UserResultDTO
            {
                Id = result.Id,
                FirstName = result.FirstName,
                LastName = result.LastName,
                CreativeThinker = result.CreativeThinker,
                TeamSupporter = result.TeamSupporter,
                Organiser = result.Organiser,
                Driver = result.Driver,
                Finisher = result.Finisher,
                Analyst = result.Analyst,
                Coordinator = result.Coordinator,
                Explorer = result.Explorer,
                Specialist = result.Specialist
            }).ToListAsync();
        }

        public async Task<UserResultDTO?> GetUserById(int id)
        { 
            return await _context.Results.Where(result => result.Id == id).Select(result => new UserResultDTO 
            {
                Id = result.Id,
                FirstName = result.FirstName,
                LastName = result.LastName,
                CreativeThinker = result.CreativeThinker,
                TeamSupporter = result.TeamSupporter,
                Organiser = result.Organiser,
                Driver = result.Driver,
                Finisher = result.Finisher,
                Analyst = result.Analyst,
                Coordinator = result.Coordinator,
                Explorer = result.Explorer,
                Specialist = result.Specialist
            }).FirstOrDefaultAsync();
        }

        public async Task<UserResultDTO> CreateUser(UserResultDTO userDTO)
        {
            var userResult = new UserResult
            {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,

                CreativeThinker = userDTO.CreativeThinker,
                TeamSupporter = userDTO.TeamSupporter,
                Organiser = userDTO.Organiser,
                Driver = userDTO.Driver,
                Finisher = userDTO.Finisher,
                Analyst = userDTO.Analyst,
                Coordinator = userDTO.Coordinator,
                Explorer = userDTO.Explorer,
                Specialist = userDTO.Specialist
            };

            _context.Results.Add(userResult);
            await _context.SaveChangesAsync();
            return new UserResultDTO
            {
                Id = userResult.Id,
                FirstName = userResult.FirstName,
                LastName = userResult.LastName,

                CreativeThinker = userResult.CreativeThinker,
                TeamSupporter = userResult.TeamSupporter,
                Organiser = userResult.Organiser,
                Driver = userResult.Driver,
                Finisher = userResult.Finisher,
                Analyst = userResult.Analyst,
                Coordinator = userResult.Coordinator,
                Explorer = userResult.Explorer,
                Specialist = userResult.Specialist
            };
        }

            public async Task<bool> DeleteUser(int id)
            {
                var result = await _context.Results.FindAsync(id);
                if (result == null) {return false;}
                _context.Results.Remove(result);
                await _context.SaveChangesAsync();
                return true;

            }
    }
}
