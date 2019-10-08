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

namespace BlaiseApi.Controllers
{
    [Consumes("application/x-www-form-urlencoded")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class TurnosController : ControllerBase
    {
        private readonly ContextDB _context;

        public TurnosController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Turnoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turno>>> GetTurnos()
        {
            return await _context.Turnos.OrderByDescending(x => x.turnoId).ToListAsync();
        }

        // GET: api/Turnoes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Turno>> GetTurno(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);

            if (turno == null)
            {
                return NotFound();
            }

            return turno;
        }

        // PUT: api/Turnoes/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutTurno([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Turno turno = JsonConvert.DeserializeObject<Turno>(data);

                Turno update = await _context.Turnos.FindAsync(turno.turnoId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Area no encontrada";
                }
                else
                {
                    update.cDescripcion = turno.cDescripcion;
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

        // POST: api/Turnoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostTurno([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Turno turno = JsonConvert.DeserializeObject<Turno>(data);
                Turno insert = new Turno
                {
                    cDescripcion = turno.cDescripcion,
                    bEstatus = turno.bEstatus
                };
                _context.Turnos.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.turnoId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }


            //return CreatedAtAction("GetArea", new { id = area.AreaId }, area);
            return res;
        }

        // DELETE: api/Turnoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteTurno(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                Turno delete = await _context.Turnos.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Turno no encontrado";
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

        private bool TurnoExists(int id)
        {
            return _context.Turnos.Any(e => e.turnoId == id);
        }
    }
}
