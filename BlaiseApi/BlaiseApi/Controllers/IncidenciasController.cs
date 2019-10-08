using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlaiseApi.Context;
using BlaiseApi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using BlaiseApi.Helpers;
using Newtonsoft.Json;

namespace BlaiseApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Consumes("application/x-www-form-urlencoded")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    [ApiController]
    public class IncidenciasController : ControllerBase
    {
        private readonly ContextDB _context;

        public IncidenciasController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Incidencias
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Incidencia>>> GetIncidencias()
        {
            return await _context.Incidencias.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<Incidencia_Response>>> GetIncidencias(int id)
        {
            return await _context.Incidencias.Where(x => x.incidenciaId == id && x.bEstatus).Select(x => new Incidencia_Response
            {
                incidenciaId = x.incidenciaId,
                cTipoIncidente = x.TipoIncidente.cDescripcion,
                cTurno = x.Turno.cDescripcion,
                cUsuario = x.Usuario.cNombres + " " + x.Usuario.cPApellido,
                dFechaFinal = x.dFechaFinal,
                dFechaInicio = x.dFechaInicio,
                dFechaRegistro = x.dFechaRegistro,
                cComentario = x.cComentario,
                nEstado = x.nEstado,
                tipoIncidenteId = x.tipoIncidenteId,
                turnoId = x.turnoId,
                usuarioId = x.usuarioId,
                lstDetalles = _context.IncidenciaDetalles.Where(y => y.incidenciaId == x.incidenciaId).Select(y => new IncidenciaDetalle_Response
                {
                    cComentario = y.cComentario,
                    cUsuarioRespuesta = y.UsuarioRespuesta.cNombres + " " + y.UsuarioRespuesta.cPApellido,
                    dFechaRespuesta = y.dFechaRespuesta,
                    incidenciaDetalleId = y.incidenciaDetalleId,
                    nRespuesta = y.nRespuesta,
                    usuarioRespuestaId =y.usuarioRespuestaId
                }).ToList()
            }).ToListAsync();
        }

        // GET: api/IncidenciasEmp/5
        [Route("IncidenciasEmp")]
        [HttpPost]
        public async Task<ActionResult<IEnumerable<Incidencia_Response>>> GetIncidencia([FromForm]string cNumEmp)
        {
            int usuarioId = _context.Usuarios.Where(x => x.cNumeroEmpleado == cNumEmp && x.bEstatus).Select(x => x.usuarioId).FirstOrDefault();
            if (usuarioId == 0) return BadRequest();

            return await _context.Incidencias.Where(x => x.usuarioId == usuarioId && x.bEstatus).OrderByDescending(x => x.incidenciaId).Select(x => new Incidencia_Response { 
                incidenciaId = x.incidenciaId,
                cTipoIncidente = x.TipoIncidente.cDescripcion,
                cTurno = x.Turno.cDescripcion,
                cUsuario = x.Usuario.cNombres + " " + x.Usuario.cPApellido,
                dFechaFinal = x.dFechaFinal,
                dFechaInicio = x.dFechaInicio,
                dFechaRegistro = x.dFechaRegistro,
                cComentario = x.cComentario,
                nEstado = x.nEstado,
                tipoIncidenteId = x.tipoIncidenteId,
                turnoId = x.turnoId,
                usuarioId = x.usuarioId
            }).ToListAsync();
        }

        // PUT: api/Incidencias/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIncidencia(int id, Incidencia incidencia)
        {
            if (id != incidencia.incidenciaId)
            {
                return BadRequest();
            }

            _context.Entry(incidencia).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IncidenciaExists(id))
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

        // POST: api/Incidencias
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostIncidencia([FromForm]string data,[FromForm]string cNumeroEmpleado)
        {
            Response res = new Response();
            try
            {
                Incidencia incidencia = JsonConvert.DeserializeObject<Incidencia>(data);
                int usuarioId = _context.Usuarios.Where(x => x.cNumeroEmpleado == cNumeroEmpleado && x.bEstatus).Select(x => x.usuarioId).FirstOrDefault();
                if (usuarioId < 0) throw new Exception("Usuario no encontrado");
                Incidencia insert = new Incidencia
                {
                    usuarioId = usuarioId,
                    bEstatus = true,
                    cComentario = incidencia.cComentario,
                    dFechaFinal = incidencia.dFechaFinal,
                    dFechaInicio = incidencia.dFechaInicio,
                    dFechaRegistro = incidencia.dFechaRegistro,
                    nEstado = 0,
                    tipoIncidenteId = incidencia.tipoIncidenteId,
                    turnoId = incidencia.turnoId
                };
                _context.Incidencias.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.incidenciaId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }

            return res;
        }

        // DELETE: api/Incidencias/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Incidencia>> DeleteIncidencia(int id)
        {
            var incidencia = await _context.Incidencias.FindAsync(id);
            if (incidencia == null)
            {
                return NotFound();
            }

            _context.Incidencias.Remove(incidencia);
            await _context.SaveChangesAsync();

            return incidencia;
        }

        private bool IncidenciaExists(int id)
        {
            return _context.Incidencias.Any(e => e.incidenciaId == id);
        }
    }
}
