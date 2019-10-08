using BlaiseApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Context
{
    public class ContextDB : DbContext
    {
        public ContextDB(DbContextOptions<ContextDB> options)
           : base(options)
        {

        }

        public DbSet<Area> Areas { get; set; }
        public DbSet<Subarea> Subareas { get; set; }
        public DbSet<TipoPersonal> TiposPersonal { get; set; }
        public DbSet<TipoUsuario> TiposUsuario { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<TipoUsuarioDetalle> TipoUsuarioDetalles { get; set; }

        public DbSet<Correo> Correos { get; set; }
        public DbSet<Demografia> Demografias { get; set; }
        public DbSet<Foto> Fotos { get; set; }
        public DbSet<Incidencia> Incidencias { get; set; }
        public DbSet<IncidenciaDetalle> IncidenciaDetalles { get; set; }
        public DbSet<Telefono> Telefonos { get; set; }
        public DbSet<TipoIncidente> TiposIncidentes { get; set; }
        public DbSet<TipoPersonalDetalle> TipoPersonalDetalles { get; set; }
        public DbSet<Turno> Turnos { get; set; }
    }
}
