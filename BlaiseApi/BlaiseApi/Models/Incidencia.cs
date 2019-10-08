using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class Incidencia
    {
        public int incidenciaId { get; set; }
        public int tipoIncidenteId { get; set; }
        public TipoIncidente TipoIncidente { get; set; }
        public int turnoId { get; set; }
        public Turno Turno { get; set; }
        public int usuarioId { get; set; }
        public Usuario Usuario { get; set; }
        [Required]
        public DateTime dFechaRegistro { get; set; }
        [Required]
        public DateTime dFechaInicio { get; set; }
        [Required]
        public DateTime dFechaFinal { get; set; }
        [Required]
        [MaxLength(length: 100)]
        public string cComentario { get; set; }
        [Required]
        public int nEstado { get; set; } = 0;
        public bool bEstatus { get; set; } = true;
    }
}
