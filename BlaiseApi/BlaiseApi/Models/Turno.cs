using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Turno
    {
        public int TurnoId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string Descripcion { get; set; }
        public bool bEstatus { get; set; } = true;

    }
}
