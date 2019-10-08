using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace BlaiseApi.Migrations
{
    public partial class tablas : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Areas",
                columns: table => new
                {
                    AreaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Areas", x => x.AreaId);
                });

            migrationBuilder.CreateTable(
                name: "TiposIncidentes",
                columns: table => new
                {
                    tipoIncidenteId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposIncidentes", x => x.tipoIncidenteId);
                });

            migrationBuilder.CreateTable(
                name: "TiposPersonal",
                columns: table => new
                {
                    tipoPersonalId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposPersonal", x => x.tipoPersonalId);
                });

            migrationBuilder.CreateTable(
                name: "TiposUsuario",
                columns: table => new
                {
                    tipoUsuarioId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TiposUsuario", x => x.tipoUsuarioId);
                });

            migrationBuilder.CreateTable(
                name: "Turnos",
                columns: table => new
                {
                    turnoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Turnos", x => x.turnoId);
                });

            migrationBuilder.CreateTable(
                name: "Subareas",
                columns: table => new
                {
                    SubareaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    AreaId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subareas", x => x.SubareaId);
                    table.ForeignKey(
                        name: "FK_Subareas_Areas_AreaId",
                        column: x => x.AreaId,
                        principalTable: "Areas",
                        principalColumn: "AreaId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TipoUsuarioDetalles",
                columns: table => new
                {
                    tipoUsuarioDetalleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipoUsuarioId = table.Column<int>(nullable: false),
                    tipoUsuarioAntId = table.Column<int>(nullable: true),
                    tipoUsuarioSigId = table.Column<int>(nullable: true),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoUsuarioDetalles", x => x.tipoUsuarioDetalleId);
                    table.ForeignKey(
                        name: "FK_TipoUsuarioDetalles_TiposUsuario_tipoUsuarioAntId",
                        column: x => x.tipoUsuarioAntId,
                        principalTable: "TiposUsuario",
                        principalColumn: "tipoUsuarioId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_TipoUsuarioDetalles_TiposUsuario_tipoUsuarioId",
                        column: x => x.tipoUsuarioId,
                        principalTable: "TiposUsuario",
                        principalColumn: "tipoUsuarioId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TipoUsuarioDetalles_TiposUsuario_tipoUsuarioSigId",
                        column: x => x.tipoUsuarioSigId,
                        principalTable: "TiposUsuario",
                        principalColumn: "tipoUsuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Usuarios",
                columns: table => new
                {
                    usuarioId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cNombres = table.Column<string>(maxLength: 50, nullable: false),
                    cPApellido = table.Column<string>(maxLength: 50, nullable: false),
                    cSApellido = table.Column<string>(maxLength: 50, nullable: false),
                    cNumeroEmpleado = table.Column<string>(maxLength: 10, nullable: false),
                    tipoUsuarioId = table.Column<int>(nullable: false),
                    tipoPersonalId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Usuarios", x => x.usuarioId);
                    table.ForeignKey(
                        name: "FK_Usuarios_TiposPersonal_tipoPersonalId",
                        column: x => x.tipoPersonalId,
                        principalTable: "TiposPersonal",
                        principalColumn: "tipoPersonalId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Usuarios_TiposUsuario_tipoUsuarioId",
                        column: x => x.tipoUsuarioId,
                        principalTable: "TiposUsuario",
                        principalColumn: "tipoUsuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TipoPersonalDetalles",
                columns: table => new
                {
                    tipoPersonalDetalleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipoPersonalId = table.Column<int>(nullable: false),
                    subareaId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TipoPersonalDetalles", x => x.tipoPersonalDetalleId);
                    table.ForeignKey(
                        name: "FK_TipoPersonalDetalles_Subareas_subareaId",
                        column: x => x.subareaId,
                        principalTable: "Subareas",
                        principalColumn: "SubareaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TipoPersonalDetalles_TiposPersonal_tipoPersonalId",
                        column: x => x.tipoPersonalId,
                        principalTable: "TiposPersonal",
                        principalColumn: "tipoPersonalId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Correos",
                columns: table => new
                {
                    correoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cCorreo = table.Column<string>(maxLength: 50, nullable: false),
                    cPrincipal = table.Column<string>(maxLength: 50, nullable: false),
                    usuarioId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Correos", x => x.correoId);
                    table.ForeignKey(
                        name: "FK_Correos_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Demografias",
                columns: table => new
                {
                    demografiaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cCalle = table.Column<string>(maxLength: 50, nullable: false),
                    cNumero = table.Column<string>(maxLength: 15, nullable: false),
                    cMunicipio = table.Column<string>(maxLength: 50, nullable: false),
                    cCp = table.Column<string>(maxLength: 10, nullable: false),
                    usuarioId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Demografias", x => x.demografiaId);
                    table.ForeignKey(
                        name: "FK_Demografias_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Fotos",
                columns: table => new
                {
                    fotoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cDescripcion = table.Column<string>(maxLength: 50, nullable: false),
                    cRuta = table.Column<string>(maxLength: 50, nullable: false),
                    cNombreFoto = table.Column<string>(maxLength: 50, nullable: false),
                    usuarioId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fotos", x => x.fotoId);
                    table.ForeignKey(
                        name: "FK_Fotos_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Incidencias",
                columns: table => new
                {
                    incidenciaId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    tipoIncidenteId = table.Column<int>(nullable: false),
                    turnoId = table.Column<int>(nullable: false),
                    usuarioId = table.Column<int>(nullable: false),
                    dFechaRegistro = table.Column<DateTime>(nullable: false),
                    dFechaInicio = table.Column<DateTime>(nullable: false),
                    dFechaFinal = table.Column<DateTime>(nullable: false),
                    cComentario = table.Column<string>(maxLength: 100, nullable: false),
                    nEstado = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Incidencias", x => x.incidenciaId);
                    table.ForeignKey(
                        name: "FK_Incidencias_TiposIncidentes_tipoIncidenteId",
                        column: x => x.tipoIncidenteId,
                        principalTable: "TiposIncidentes",
                        principalColumn: "tipoIncidenteId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Incidencias_Turnos_turnoId",
                        column: x => x.turnoId,
                        principalTable: "Turnos",
                        principalColumn: "turnoId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Incidencias_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Telefonos",
                columns: table => new
                {
                    telefonoId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    cTipo_telefono = table.Column<string>(maxLength: 50, nullable: false),
                    cTelefono = table.Column<string>(maxLength: 15, nullable: false),
                    usuarioId = table.Column<int>(nullable: false),
                    bEstatus = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Telefonos", x => x.telefonoId);
                    table.ForeignKey(
                        name: "FK_Telefonos_Usuarios_usuarioId",
                        column: x => x.usuarioId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "IncidenciaDetalles",
                columns: table => new
                {
                    incidenciaDetalleId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    incidenciaId = table.Column<int>(nullable: false),
                    usuarioRespuestaId = table.Column<int>(nullable: true),
                    dFechaRespuesta = table.Column<DateTime>(nullable: false),
                    cComentario = table.Column<string>(maxLength: 100, nullable: false),
                    nRespuesta = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncidenciaDetalles", x => x.incidenciaDetalleId);
                    table.ForeignKey(
                        name: "FK_IncidenciaDetalles_Incidencias_incidenciaId",
                        column: x => x.incidenciaId,
                        principalTable: "Incidencias",
                        principalColumn: "incidenciaId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_IncidenciaDetalles_Usuarios_usuarioRespuestaId",
                        column: x => x.usuarioRespuestaId,
                        principalTable: "Usuarios",
                        principalColumn: "usuarioId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Correos_usuarioId",
                table: "Correos",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Demografias_usuarioId",
                table: "Demografias",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Fotos_usuarioId",
                table: "Fotos",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_IncidenciaDetalles_incidenciaId",
                table: "IncidenciaDetalles",
                column: "incidenciaId");

            migrationBuilder.CreateIndex(
                name: "IX_IncidenciaDetalles_usuarioRespuestaId",
                table: "IncidenciaDetalles",
                column: "usuarioRespuestaId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidencias_tipoIncidenteId",
                table: "Incidencias",
                column: "tipoIncidenteId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidencias_turnoId",
                table: "Incidencias",
                column: "turnoId");

            migrationBuilder.CreateIndex(
                name: "IX_Incidencias_usuarioId",
                table: "Incidencias",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_Subareas_AreaId",
                table: "Subareas",
                column: "AreaId");

            migrationBuilder.CreateIndex(
                name: "IX_Telefonos_usuarioId",
                table: "Telefonos",
                column: "usuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoPersonalDetalles_subareaId",
                table: "TipoPersonalDetalles",
                column: "subareaId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoPersonalDetalles_tipoPersonalId",
                table: "TipoPersonalDetalles",
                column: "tipoPersonalId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoUsuarioDetalles_tipoUsuarioAntId",
                table: "TipoUsuarioDetalles",
                column: "tipoUsuarioAntId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoUsuarioDetalles_tipoUsuarioId",
                table: "TipoUsuarioDetalles",
                column: "tipoUsuarioId");

            migrationBuilder.CreateIndex(
                name: "IX_TipoUsuarioDetalles_tipoUsuarioSigId",
                table: "TipoUsuarioDetalles",
                column: "tipoUsuarioSigId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_tipoPersonalId",
                table: "Usuarios",
                column: "tipoPersonalId");

            migrationBuilder.CreateIndex(
                name: "IX_Usuarios_tipoUsuarioId",
                table: "Usuarios",
                column: "tipoUsuarioId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Correos");

            migrationBuilder.DropTable(
                name: "Demografias");

            migrationBuilder.DropTable(
                name: "Fotos");

            migrationBuilder.DropTable(
                name: "IncidenciaDetalles");

            migrationBuilder.DropTable(
                name: "Telefonos");

            migrationBuilder.DropTable(
                name: "TipoPersonalDetalles");

            migrationBuilder.DropTable(
                name: "TipoUsuarioDetalles");

            migrationBuilder.DropTable(
                name: "Incidencias");

            migrationBuilder.DropTable(
                name: "Subareas");

            migrationBuilder.DropTable(
                name: "TiposIncidentes");

            migrationBuilder.DropTable(
                name: "Turnos");

            migrationBuilder.DropTable(
                name: "Usuarios");

            migrationBuilder.DropTable(
                name: "Areas");

            migrationBuilder.DropTable(
                name: "TiposPersonal");

            migrationBuilder.DropTable(
                name: "TiposUsuario");
        }
    }
}
