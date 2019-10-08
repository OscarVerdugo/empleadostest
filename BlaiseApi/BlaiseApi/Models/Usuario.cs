using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Usuario
    {
        public int usuarioId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cNombres { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cPApellido { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cSApellido { get; set; }
        [Required]
        [MaxLength(length: 20)]
        public string cContra { get; set; }
        [Required]
        [MaxLength(length: 10)]
        public string cNumeroEmpleado { get; set; }
        public int tipoUsuarioId { get; set; }
        public TipoUsuario TipoUsuario { get; set; }
        public int tipoPersonalId { get; set; }
        public TipoPersonal TipoPersonal { get; set; }
        public bool bAdmin { get; set; } = false;
        public bool bEstatus { get; set; } = true;
    }
}
