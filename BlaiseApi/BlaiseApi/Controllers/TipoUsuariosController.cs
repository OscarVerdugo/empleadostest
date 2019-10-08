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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BlaiseApi.Controllers
{
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Consumes("application/x-www-form-urlencoded")]
    [ApiController]
    public class TipoUsuariosController : ControllerBase
    {
        private readonly ContextDB _context;

        public TipoUsuariosController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/TipoUsuarios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoUsuario>>> GetTiposUsuario()
        {
            return await _context.TiposUsuario.OrderBy(x => x.tipoUsuarioId).ToListAsync();
        }

        // GET: api/TipoUsuarios/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoUsuario>> GetTipoUsuario(int id)
        {
            var tipoUsuario = await _context.TiposUsuario.FindAsync(id);

            if (tipoUsuario == null)
            {
                return NotFound();
            }

            return tipoUsuario;
        }

        // PUT: api/TipoUsuarios/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutTipoUsuario([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoUsuario tipoUsuario = JsonConvert.DeserializeObject<TipoUsuario>(data);

                TipoUsuario update = await _context.TiposUsuario.FindAsync(tipoUsuario.tipoUsuarioId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Area no encontrada";
                }
                else
                {
                    update.cDescripcion = tipoUsuario.cDescripcion;
                    update.nEstadoAsignado = tipoUsuario.nEstadoAsignado;

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

        // POST: api/TipoUsuarios
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostTipoUsuario([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoUsuario tipoUsuario = JsonConvert.DeserializeObject<TipoUsuario>(data);
                TipoUsuario insert = new TipoUsuario
                {
                    cDescripcion = tipoUsuario.cDescripcion,
                    nEstadoAsignado = tipoUsuario.nEstadoAsignado,
                    bEstatus = tipoUsuario.bEstatus
                };
                _context.TiposUsuario.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.tipoUsuarioId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }


            return res;
        }

        // DELETE: api/TipoUsuarios/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteTipoUsuario(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                TipoUsuario delete = await _context.TiposUsuario.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Tipo de usuario no encontrado";
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

        private bool TipoUsuarioExists(int id)
        {
            return _context.TiposUsuario.Any(e => e.tipoUsuarioId == id);
        }
    }
}
