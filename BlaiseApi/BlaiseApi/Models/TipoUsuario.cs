using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class TipoUsuario
    {
        public int tipoUsuarioId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cDescripcion { get; set; }
        public int nEstadoAsignado { get; set; } = 1;
        public bool bEstatus { get; set; } = true;
    }
}
