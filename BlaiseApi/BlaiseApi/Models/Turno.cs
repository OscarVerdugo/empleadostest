using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Turno
    {
        public int turnoId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cDescripcion { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
