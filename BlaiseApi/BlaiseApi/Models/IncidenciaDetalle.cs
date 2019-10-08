using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class IncidenciaDetalle
    {
        public int incidenciaDetalleId { get; set; }
        public int incidenciaId { get; set; }
        public Incidencia Incidencia { get; set; }
        public int? usuarioRespuestaId { get; set; }
        public Usuario UsuarioRespuesta { get; set; }
        [Required]
        public DateTime dFechaRespuesta { get; set; }
        [Required]
        [MaxLength(length: 100)]
        public string cComentario { get; set; }
        [Required]
        public int nRespuesta { get; set; } = 0;
    }
}
