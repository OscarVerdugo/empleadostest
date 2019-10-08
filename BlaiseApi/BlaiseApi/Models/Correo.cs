using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Correo
    {
        public int correoId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cCorreo { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cPrincipal { get; set; }
        public int usuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
