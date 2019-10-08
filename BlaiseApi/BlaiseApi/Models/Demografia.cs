using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Demografia
    {
        public int demografiaId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cCalle { get; set; }
        [Required]
        [MaxLength(length: 15)]
        public string cNumero { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cMunicipio { get; set; }
        [Required]
        [MaxLength(length: 10)]
        public string cCp { get; set; }
        public int usuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
