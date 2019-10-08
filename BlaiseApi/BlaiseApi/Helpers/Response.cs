using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Helpers
{
    public class Response
    {
        public string cMensaje { get; set; }
        public bool bError { get; set; } = false;
        public int nPayload { get; set; }
        public string cToken { get; set; }
        public string cPayload { get; set; }
    }
}
