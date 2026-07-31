
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using TeamRoleTest1.Data;
using TeamRoleTest1.Services;

namespace TeamRoleTest1
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            
            // Add services to the container.
            builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

            builder.Services.AddScoped<IUserResultservices, UserServices>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowFrontendOnly",
                    policy =>
                    {
                        policy.WithOrigins("http://localhost:5500", "http://127.0.0.1:5500")
                        .AllowAnyHeader()
                        .AllowAnyMethod();
                    });
            });

            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            builder.Services.AddOpenApi();

            var app = builder.Build();

            app.UseRouting();
            app.UseCors("AllowFrontendOnly");

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.MapOpenApi();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
