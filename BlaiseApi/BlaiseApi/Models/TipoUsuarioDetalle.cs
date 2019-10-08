using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Models
{
    public class TipoUsuarioDetalle
    {
        public int tipoUsuarioDetalleId { get; set; }
        public int tipoUsuarioId { get; set; }
        public TipoUsuario TipoUsuario { get; set; }
        public int? tipoUsuarioAntId { get; set; }
        public TipoUsuario TipoUsuarioAnt { get; set; }
        public int? tipoUsuarioSigId { get; set; }
        public TipoUsuario TipoUsuarioSig { get; set; }
        public bool bEstatus { get; set; } = true;
    }
}
