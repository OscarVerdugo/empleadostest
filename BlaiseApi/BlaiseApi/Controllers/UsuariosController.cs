using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlaiseApi.Context;
using BlaiseApi.Models;
using BlaiseApi.Helpers;
using Newtonsoft.Json;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace BlaiseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly ContextDB _context;
        private readonly IConfiguration _config;

        public UsuariosController(ContextDB context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        // GET: api/Usuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Usuario>>> GetUsuarios()
        {
            return await _context.Usuarios.OrderByDescending(x => x.usuarioId).ToListAsync();
        }

        // GET: api/Usuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Usuario>> GetUsuario(int id)
        {
            var usuario = await _context.Usuarios.FindAsync(id);

            if (usuario == null)
            {
                return NotFound();
            }

            return usuario;
        }

        // PUT: api/Usuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutUsuario([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Usuario usuario = JsonConvert.DeserializeObject<Usuario>(data);

                Usuario update = await _context.Usuarios.FindAsync(usuario.usuarioId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Usuario no encontrado";
                }
                else
                {
                    update.cNombres = usuario.cNombres;
                    update.cPApellido = usuario.cPApellido;
                    update.cSApellido = usuario.cSApellido;
                    update.cNumeroEmpleado = usuario.cNumeroEmpleado;
                    update.tipoPersonalId = usuario.tipoPersonalId;
                    update.tipoUsuarioId = usuario.tipoUsuarioId;
                    update.cContra = usuario.cContra;


                    _context.Entry(update).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        // POST: api/Usuarios
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostUsuario([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Usuario usuario = JsonConvert.DeserializeObject<Usuario>(data);
                Usuario insert = new Usuario
                {
                    cNombres = usuario.cNombres,
                    cPApellido = usuario.cPApellido,
                    cSApellido = usuario.cSApellido,
                    cNumeroEmpleado = usuario.cNumeroEmpleado,
                    tipoPersonalId = usuario.tipoPersonalId,
                    tipoUsuarioId = usuario.tipoUsuarioId,
                    cContra = usuario.cContra,
                    bEstatus = true
                };
                _context.Usuarios.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.usuarioId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }

            return res;
        }

        // DELETE: api/Usuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteUsuario(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                Usuario delete = await _context.Usuarios.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Usuario no encontrado";
                }
                else
                {
                    delete.bEstatus = false;
                    _context.Entry(delete).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }

            }
            catch (Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        [Route("AuthUser")]
        [HttpPost]
        public async Task<ActionResult<Response>> AuthUser([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Auth auth = JsonConvert.DeserializeObject<Auth>(data);
                Usuario us = _context.Usuarios.Where(x => x.cContra == auth.cContra && x.cNumeroEmpleado == auth.cNumeroEmpleado && x.bEstatus).FirstOrDefault();
                if (us == null)
                {
                    res.bError = true;
                    res.cMensaje = "Usuario o contraseña incorrecto";
                }
                else
                {
                    auth.bAdmin = us.bAdmin;
                    res.cPayload = JsonConvert.SerializeObject(new Usuario { cNombres = us.cNombres,cPApellido = us.cPApellido, cSApellido = us.cSApellido,cNumeroEmpleado = us.cNumeroEmpleado});
                    res.bError = false;
                    res.cToken = BuildToken(auth);
                }
            }
            catch(Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        [Route("VerifyUser")]
        [HttpPost]
        public async Task<ActionResult<Response>> VerifyUser([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Auth auth = JsonConvert.DeserializeObject<Auth>(data);
                string cNumEmp = DecodeToken(auth.cToken, "unique_name");
                Usuario us = _context.Usuarios.Where(x => x.cNumeroEmpleado == cNumEmp && x.bEstatus).FirstOrDefault();
                if (us == null)
                {
                    res.bError = true;
                    res.cMensaje = "No existe";
                }
            }
            catch(Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        [Route("isAdmin")]
        [HttpPost]
        public async Task<ActionResult<Response>> isAdmin([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Auth auth = JsonConvert.DeserializeObject<Auth>(data);
                string cNumEmp = DecodeToken(auth.cToken, "unique_name");
                Usuario us = _context.Usuarios.Where(x => x.cNumeroEmpleado == cNumEmp && x.bEstatus).FirstOrDefault();
                if (us == null)
                {
                    res.bError = true;
                    res.cMensaje = "No existe";
                }
                else
                {
                    res.bError = !us.bAdmin;
                }
            }
            catch (Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        public string BuildToken(Auth data)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.UniqueName,data.cNumeroEmpleado),
                new Claim("bAdmin",data.bAdmin.ToString())
            };

            //var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Ultra_duper_super_secret_key"]));
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ANI9SD01I9N2D0ANS0D91N21N329ASD"));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var expiration = DateTime.UtcNow.AddDays(2);

            JwtSecurityToken token = new JwtSecurityToken(
                issuer: "midominio.com",
                audience: "midominio.com",
                claims: claims,
                expires: expiration,
                signingCredentials: creds
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        
        public string DecodeToken(string token, string prop)
        {
            var handler = new JwtSecurityTokenHandler();
            //var jsonToken = handler.ReadToken(token);
            var tokenS = handler.ReadJwtToken(token) as JwtSecurityToken;
            var value = tokenS.Claims.First(claim => claim.Type == prop).Value;
            return value;
        }

        private bool UsuarioExists(int id)
        {
            return _context.Usuarios.Any(e => e.usuarioId == id);
        }
    }
}
