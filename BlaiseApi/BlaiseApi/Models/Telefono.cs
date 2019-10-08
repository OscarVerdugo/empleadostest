using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Telefono
    {
        public int telefonoId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cTipo_telefono { get; set; }
        [Required]
        [MaxLength(length: 15)]
        public string cTelefono { get; set; }
        public int usuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
