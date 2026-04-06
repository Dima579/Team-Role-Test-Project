using Microsoft.EntityFrameworkCore;
using TeamRoleTest1.Models;

namespace TeamRoleTest1.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options): base(options) {}

        public DbSet<UserResult> Results {get; set;}

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserResult>().HasData
                (
                    new UserResult {Id=1, FirstName="Johhny", LastName="IronBridge", CreativeThinker=2, TeamSupporter=1, Organiser=1, Driver=4, Finisher=1, Analyst=2, Coordinator=1, Explorer=0, Specialist=0},
                    new UserResult {Id=2, FirstName="Janet", LastName="Springfield", CreativeThinker=2, TeamSupporter=3, Organiser=2, Driver=1, Finisher=2, Analyst=2, Coordinator=0, Explorer=0, Specialist=0},
                    new UserResult {Id=3, FirstName="Mark", LastName="Gravel", CreativeThinker=4, TeamSupporter=0, Organiser=2, Driver=3, Finisher=0, Analyst=1, Coordinator=1, Explorer=0, Specialist=1}
                );
        }
    }
}
