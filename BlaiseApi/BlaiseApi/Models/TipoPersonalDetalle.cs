using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class TipoPersonalDetalle
    {
        public int tipoPersonalDetalleId { get; set; }
        public int tipoPersonalId { get; set; }
        public TipoPersonal TipoPersonal { get; set; }
        public int subareaId { get; set; }
        public Subarea Subarea { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
