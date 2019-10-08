using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlaiseApi.Context;
using BlaiseApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BlaiseApi.Helpers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Cors;

namespace BlaiseApi.Controllers
{
    //[EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Consumes("application/x-www-form-urlencoded")]
    [ApiController]
    public class TipoIncidentesController : ControllerBase
    {
        private readonly ContextDB _context;

        public TipoIncidentesController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/TipoIncidentes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoIncidente>>> GetTiposIncidentes()
        {
            return await _context.TiposIncidentes.OrderByDescending(x => x.tipoIncidenteId).ToListAsync();
        }

        // GET: api/TipoIncidentes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoIncidente>> GetTipoIncidente(int id)
        {
            var tipoIncidente = await _context.TiposIncidentes.FindAsync(id);

            if (tipoIncidente == null)
            {
                return NotFound();
            }

            return tipoIncidente;
        }

        // PUT: api/TipoIncidentes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutTipoIncidente([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoIncidente tipoIncidente = JsonConvert.DeserializeObject<TipoIncidente>(data);

                TipoIncidente update = await _context.TiposIncidentes.FindAsync(tipoIncidente.tipoIncidenteId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Area no encontrada";
                }
                else
                {
                    update.cDescripcion = tipoIncidente.cDescripcion;
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

        // POST: api/TipoIncidentes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostTipoIncidente([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoIncidente tipoIncidente = JsonConvert.DeserializeObject<TipoIncidente>(data);
                TipoIncidente insert = new TipoIncidente
                {
                    cDescripcion = tipoIncidente.cDescripcion,
                    bEstatus = tipoIncidente.bEstatus
                };
                _context.TiposIncidentes.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.tipoIncidenteId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }


            //return CreatedAtAction("GetArea", new { id = area.AreaId }, area);
            return res;
        }

        // DELETE: api/TipoIncidentes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteTipoIncidente(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                TipoIncidente delete = await _context.TiposIncidentes.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Tipo de incidente no encontrado";
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
            //var area = await _context.Areas.FindAsync(id);
            //if (area == null)
            //{
            //    return NotFound();
            //}

            //_context.Areas.Remove(area);
            //await _context.SaveChangesAsync();

            return res;
        }

        private bool TipoIncidenteExists(int id)
        {
            return _context.TiposIncidentes.Any(e => e.tipoIncidenteId == id);
        }
    }
}
