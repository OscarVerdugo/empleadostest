using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Helpers
{
    public class Incidencia_Response
    {
        public int incidenciaId { get; set; }
        public int tipoIncidenteId { get; set; }
        public string cTipoIncidente { get; set; }
        public int turnoId { get; set; }
        public string cTurno { get; set; }
        public int usuarioId { get; set; }
        public string cUsuario { get; set; }
        public DateTime dFechaRegistro { get; set; }
        public DateTime dFechaInicio { get; set; }
        public DateTime dFechaFinal { get; set; }
        public string cComentario { get; set; }
        public int nEstado { get; set; } = 0;
        public bool bEstatus { get; set; } = true;
        public List<IncidenciaDetalle_Response> lstDetalles { get; set; }

        public Incidencia_Response()
        {
            lstDetalles = new List<IncidenciaDetalle_Response>();
        }
    }
}
