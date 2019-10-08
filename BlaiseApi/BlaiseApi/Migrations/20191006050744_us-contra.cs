using Microsoft.EntityFrameworkCore.Migrations;

namespace BlaiseApi.Migrations
{
    public partial class uscontra : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "cContra",
                table: "Usuarios",
                maxLength: 20,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "cContra",
                table: "Usuarios");
        }
    }
}
