using Microsoft.AspNetCore.Mvc;
using TeamRoleTest1.DTOs;

namespace TeamRoleTest1.Services
{
    public interface IUserResultservices
    {
        public Task<List<UserResultDTO>> GetAllUsers();

        public Task<UserResultDTO?> GetUserById(int id);

        public Task<UserResultDTO> CreateUser(UserResultDTO userDTO);

        public Task<bool> DeleteUser(int id);
    }
}
