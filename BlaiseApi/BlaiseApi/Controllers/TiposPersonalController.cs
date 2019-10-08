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
    public class TiposPersonalController : ControllerBase
    {
        private readonly ContextDB _context;

        public TiposPersonalController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/TipoPersonals
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TipoPersonal>>> GetTiposPersonal()
        {
            return await _context.TiposPersonal.OrderByDescending(x => x.tipoPersonalId).ToListAsync();
        }

        // GET: api/TipoPersonals/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TipoPersonal>> GetTipoPersonal(int id)
        {
            var tipoPersonal = await _context.TiposPersonal.FindAsync(id);

            if (tipoPersonal == null)
            {
                return NotFound();
            }

            return tipoPersonal;
        }

        // PUT: api/TipoPersonals/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutTipoPersonal([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoPersonal tipoPersonal = JsonConvert.DeserializeObject<TipoPersonal>(data);

                TipoPersonal update = await _context.TiposPersonal.FindAsync(tipoPersonal.tipoPersonalId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Tipo de Personal no encontrado";
                }
                else
                {
                    update.cDescripcion = tipoPersonal.cDescripcion;

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

        // POST: api/TiposPersonal
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostTipoPersonal([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                TipoPersonal tipoPersonal = JsonConvert.DeserializeObject<TipoPersonal>(data);
                TipoPersonal insert = new TipoPersonal
                {
                    cDescripcion = tipoPersonal.cDescripcion,
                    bEstatus = tipoPersonal.bEstatus
                };
                _context.TiposPersonal.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.tipoPersonalId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }


            //return CreatedAtAction("GetArea", new { id = area.AreaId }, area);
            return res;
        }

        // DELETE: api/TipoPersonals/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteTipoPersonal(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                TipoPersonal delete = await _context.TiposPersonal.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Tipo de personal no encontrado";
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

        private bool TipoPersonalExists(int id)
        {
            return _context.TiposPersonal.Any(e => e.tipoPersonalId == id);
        }
    }
}
