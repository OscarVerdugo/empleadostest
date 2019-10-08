using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Foto
    {
        public int fotoId { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cDescripcion { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cRuta { get; set; }
        [Required]
        [MaxLength(length: 50)]
        public string cNombreFoto { get; set; }
        public int usuarioId { get; set; }
        public Usuario Usuario { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
