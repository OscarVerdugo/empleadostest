using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlaiseApi.Data;
using BlaiseApi.Models;

namespace BlaiseApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurnoesController : ControllerBase
    {
        private readonly DBcontexto _context;

        public TurnoesController(DBcontexto context)
        {
            _context = context;
        }

        // GET: api/Turnoes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Turno>>> GetTurnos()
        {
            return await _context.Turnos.ToListAsync();
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
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTurno(int id, Turno turno)
        {
            if (id != turno.TurnoId)
            {
                return BadRequest();
            }

            _context.Entry(turno).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TurnoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Turnoes
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Turno>> PostTurno([FromBody]Turno turno)
        {
            _context.Turnos.Add(turno);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTurno", new { id = turno.TurnoId }, turno);
        }

        // DELETE: api/Turnoes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Turno>> DeleteTurno(int id)
        {
            var turno = await _context.Turnos.FindAsync(id);
            if (turno == null)
            {
                return NotFound();
            }

            _context.Turnos.Remove(turno);
            await _context.SaveChangesAsync();

            return turno;
        }

        private bool TurnoExists(int id)
        {
            return _context.Turnos.Any(e => e.TurnoId == id);
        }
    }
}
