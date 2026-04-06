using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace TeamRoleTest1.Migrations
{
    /// <inheritdoc />
    public partial class InitialiseSeededDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Results",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    CreativeThinker = table.Column<int>(type: "int", nullable: false),
                    TeamSupporter = table.Column<int>(type: "int", nullable: false),
                    Organiser = table.Column<int>(type: "int", nullable: false),
                    Driver = table.Column<int>(type: "int", nullable: false),
                    Finisher = table.Column<int>(type: "int", nullable: false),
                    Analyst = table.Column<int>(type: "int", nullable: false),
                    Coordinator = table.Column<int>(type: "int", nullable: false),
                    Explorer = table.Column<int>(type: "int", nullable: false),
                    Specialist = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Results", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Results",
                columns: new[] { "Id", "Analyst", "Coordinator", "CreativeThinker", "Driver", "Explorer", "Finisher", "FirstName", "LastName", "Organiser", "Specialist", "TeamSupporter" },
                values: new object[,]
                {
                    { 1, 2, 1, 2, 4, 0, 1, "Johhny", "IronBridge", 1, 0, 1 },
                    { 2, 2, 0, 2, 1, 0, 2, "Janet", "Springfield", 2, 0, 3 },
                    { 3, 1, 1, 4, 3, 0, 0, "Mark", "Gravel", 2, 1, 0 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Results");
        }
    }
}
