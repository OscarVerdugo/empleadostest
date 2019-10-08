using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BlaiseApi.Helpers
{
    public class Auth
    {
        public string cNumeroEmpleado { get; set; }
        public string cContra { get; set; }
        public bool bAdmin { get; set; } = false;
        public string cToken { get; set; } = "";
    }
}
