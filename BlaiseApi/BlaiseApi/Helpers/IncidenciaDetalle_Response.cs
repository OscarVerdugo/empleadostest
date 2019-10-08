using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Helpers
{
    public class IncidenciaDetalle_Response
    {
        public int incidenciaDetalleId { get; set; }
        public int? usuarioRespuestaId { get; set; }
        public string cUsuarioRespuesta { get; set; }
        public DateTime dFechaRespuesta { get; set; }
        public string cComentario { get; set; }
        public int nRespuesta { get; set; } = 0;
    }
}
