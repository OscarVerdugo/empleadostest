using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore;
using Microsoft.EntityFrameworkCore;
using BlaiseApi.Models;

namespace BlaiseApi.Data
{
    public class DBcontexto : DbContext
    {
        public DBcontexto(DbContextOptions<DBcontexto> options)
            : base(options)
        {

        }
        public DbSet<Turno> Turnos { get; set; }
        public DbSet<Area> Areas { get; set; }
        public DbSet<TipoIncidentes> TipoIncidentes { get; set; }
        public DbSet<SubArea> SubAreas { get; set; }
        public DbSet<TipoPersonal> TipoPersonals { get; set; }
        public DbSet<Foto> Fotos { get; set; }
        public DbSet<Personal> Personals { get; set; }
        public DbSet<Correo> Correos { get; set; }

    }
}
