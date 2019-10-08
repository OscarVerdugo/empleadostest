using Microsoft.EntityFrameworkCore.Migrations;

namespace BlaiseApi.Migrations
{
    public partial class nestado : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "nEstadoAsignado",
                table: "TiposUsuario",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "nEstadoAsignado",
                table: "TiposUsuario");
        }
    }
}
