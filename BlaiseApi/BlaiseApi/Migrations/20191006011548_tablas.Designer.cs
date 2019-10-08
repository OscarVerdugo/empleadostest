﻿// <auto-generated />
using System;
using BlaiseApi.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace BlaiseApi.Migrations
{
    [DbContext(typeof(ContextDB))]
    [Migration("20191006011548_tablas")]
    partial class tablas
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("BlaiseApi.Models.Area", b =>
                {
                    b.Property<int>("AreaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("AreaId");

                    b.ToTable("Areas");
                });

            modelBuilder.Entity("BlaiseApi.Models.Correo", b =>
                {
                    b.Property<int>("correoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cCorreo")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cPrincipal")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.HasKey("correoId");

                    b.HasIndex("usuarioId");

                    b.ToTable("Correos");
                });

            modelBuilder.Entity("BlaiseApi.Models.Demografia", b =>
                {
                    b.Property<int>("demografiaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cCalle")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cCp")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("cMunicipio")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cNumero")
                        .IsRequired()
                        .HasColumnType("nvarchar(15)")
                        .HasMaxLength(15);

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.HasKey("demografiaId");

                    b.HasIndex("usuarioId");

                    b.ToTable("Demografias");
                });

            modelBuilder.Entity("BlaiseApi.Models.Foto", b =>
                {
                    b.Property<int>("fotoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cNombreFoto")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cRuta")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.HasKey("fotoId");

                    b.HasIndex("usuarioId");

                    b.ToTable("Fotos");
                });

            modelBuilder.Entity("BlaiseApi.Models.Incidencia", b =>
                {
                    b.Property<int>("incidenciaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cComentario")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime>("dFechaFinal")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("dFechaInicio")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("dFechaRegistro")
                        .HasColumnType("datetime2");

                    b.Property<int>("nEstado")
                        .HasColumnType("int");

                    b.Property<int>("tipoIncidenteId")
                        .HasColumnType("int");

                    b.Property<int>("turnoId")
                        .HasColumnType("int");

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.HasKey("incidenciaId");

                    b.HasIndex("tipoIncidenteId");

                    b.HasIndex("turnoId");

                    b.HasIndex("usuarioId");

                    b.ToTable("Incidencias");
                });

            modelBuilder.Entity("BlaiseApi.Models.IncidenciaDetalle", b =>
                {
                    b.Property<int>("incidenciaDetalleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("cComentario")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<DateTime>("dFechaRespuesta")
                        .HasColumnType("datetime2");

                    b.Property<int>("incidenciaId")
                        .HasColumnType("int");

                    b.Property<int>("nRespuesta")
                        .HasColumnType("int");

                    b.Property<int?>("usuarioRespuestaId")
                        .HasColumnType("int");

                    b.HasKey("incidenciaDetalleId");

                    b.HasIndex("incidenciaId");

                    b.HasIndex("usuarioRespuestaId");

                    b.ToTable("IncidenciaDetalles");
                });

            modelBuilder.Entity("BlaiseApi.Models.Subarea", b =>
                {
                    b.Property<int>("SubareaId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AreaId")
                        .HasColumnType("int");

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("SubareaId");

                    b.HasIndex("AreaId");

                    b.ToTable("Subareas");
                });

            modelBuilder.Entity("BlaiseApi.Models.Telefono", b =>
                {
                    b.Property<int>("telefonoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cTelefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(15)")
                        .HasMaxLength(15);

                    b.Property<string>("cTipo_telefono")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("usuarioId")
                        .HasColumnType("int");

                    b.HasKey("telefonoId");

                    b.HasIndex("usuarioId");

                    b.ToTable("Telefonos");
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoIncidente", b =>
                {
                    b.Property<int>("tipoIncidenteId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("tipoIncidenteId");

                    b.ToTable("TiposIncidentes");
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoPersonal", b =>
                {
                    b.Property<int>("tipoPersonalId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("tipoPersonalId");

                    b.ToTable("TiposPersonal");
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoPersonalDetalle", b =>
                {
                    b.Property<int>("tipoPersonalDetalleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<int>("subareaId")
                        .HasColumnType("int");

                    b.Property<int>("tipoPersonalId")
                        .HasColumnType("int");

                    b.HasKey("tipoPersonalDetalleId");

                    b.HasIndex("subareaId");

                    b.HasIndex("tipoPersonalId");

                    b.ToTable("TipoPersonalDetalles");
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoUsuario", b =>
                {
                    b.Property<int>("tipoUsuarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("tipoUsuarioId");

                    b.ToTable("TiposUsuario");
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoUsuarioDetalle", b =>
                {
                    b.Property<int>("tipoUsuarioDetalleId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<int?>("tipoUsuarioAntId")
                        .HasColumnType("int");

                    b.Property<int>("tipoUsuarioId")
                        .HasColumnType("int");

                    b.Property<int?>("tipoUsuarioSigId")
                        .HasColumnType("int");

                    b.HasKey("tipoUsuarioDetalleId");

                    b.HasIndex("tipoUsuarioAntId");

                    b.HasIndex("tipoUsuarioId");

                    b.HasIndex("tipoUsuarioSigId");

                    b.ToTable("TipoUsuarioDetalles");
                });

            modelBuilder.Entity("BlaiseApi.Models.Turno", b =>
                {
                    b.Property<int>("turnoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cDescripcion")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.HasKey("turnoId");

                    b.ToTable("Turnos");
                });

            modelBuilder.Entity("BlaiseApi.Models.Usuario", b =>
                {
                    b.Property<int>("usuarioId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("bEstatus")
                        .HasColumnType("bit");

                    b.Property<string>("cNombres")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cNumeroEmpleado")
                        .IsRequired()
                        .HasColumnType("nvarchar(10)")
                        .HasMaxLength(10);

                    b.Property<string>("cPApellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<string>("cSApellido")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int>("tipoPersonalId")
                        .HasColumnType("int");

                    b.Property<int>("tipoUsuarioId")
                        .HasColumnType("int");

                    b.HasKey("usuarioId");

                    b.HasIndex("tipoPersonalId");

                    b.HasIndex("tipoUsuarioId");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("BlaiseApi.Models.Correo", b =>
                {
                    b.HasOne("BlaiseApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.Demografia", b =>
                {
                    b.HasOne("BlaiseApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.Foto", b =>
                {
                    b.HasOne("BlaiseApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.Incidencia", b =>
                {
                    b.HasOne("BlaiseApi.Models.TipoIncidente", "TipoIncidente")
                        .WithMany()
                        .HasForeignKey("tipoIncidenteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.Turno", "Turno")
                        .WithMany()
                        .HasForeignKey("turnoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.IncidenciaDetalle", b =>
                {
                    b.HasOne("BlaiseApi.Models.Incidencia", "Incidencia")
                        .WithMany()
                        .HasForeignKey("incidenciaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.Usuario", "UsuarioRespuesta")
                        .WithMany()
                        .HasForeignKey("usuarioRespuestaId");
                });

            modelBuilder.Entity("BlaiseApi.Models.Subarea", b =>
                {
                    b.HasOne("BlaiseApi.Models.Area", "Area")
                        .WithMany()
                        .HasForeignKey("AreaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.Telefono", b =>
                {
                    b.HasOne("BlaiseApi.Models.Usuario", "Usuario")
                        .WithMany()
                        .HasForeignKey("usuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoPersonalDetalle", b =>
                {
                    b.HasOne("BlaiseApi.Models.Subarea", "Subarea")
                        .WithMany()
                        .HasForeignKey("subareaId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.TipoPersonal", "TipoPersonal")
                        .WithMany()
                        .HasForeignKey("tipoPersonalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("BlaiseApi.Models.TipoUsuarioDetalle", b =>
                {
                    b.HasOne("BlaiseApi.Models.TipoUsuario", "TipoUsuarioAnt")
                        .WithMany()
                        .HasForeignKey("tipoUsuarioAntId");

                    b.HasOne("BlaiseApi.Models.TipoUsuario", "TipoUsuario")
                        .WithMany()
                        .HasForeignKey("tipoUsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.TipoUsuario", "TipoUsuarioSig")
                        .WithMany()
                        .HasForeignKey("tipoUsuarioSigId");
                });

            modelBuilder.Entity("BlaiseApi.Models.Usuario", b =>
                {
                    b.HasOne("BlaiseApi.Models.TipoPersonal", "TipoPersonal")
                        .WithMany()
                        .HasForeignKey("tipoPersonalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("BlaiseApi.Models.TipoUsuario", "TipoUsuario")
                        .WithMany()
                        .HasForeignKey("tipoUsuarioId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
