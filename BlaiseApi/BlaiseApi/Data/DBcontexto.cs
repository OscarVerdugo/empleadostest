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


    }
}
