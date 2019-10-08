using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Subarea
    {
        public int SubareaId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cDescripcion { get; set; }
        [Required]
        public int AreaId { get; set; }
        public Area Area { get; set; }
        public bool bEstatus { get; set; } = true;

    }
}
