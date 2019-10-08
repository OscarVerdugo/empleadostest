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
using BlaiseApi.Helpers;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BlaiseApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Consumes("application/x-www-form-urlencoded")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

    [Route("api/[controller]")]
    [ApiController]
    public class SubareasController : ControllerBase
    {
        private readonly ContextDB _context;

        public SubareasController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Subareas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Subarea>>> GetSubareas()
        {
            return await _context.Subareas.OrderByDescending(x => x.SubareaId).ToListAsync();
        }

        // GET: api/Subareas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Subarea>> GetSubarea(int id)
        {
            var subarea = await _context.Subareas.FindAsync(id);

            if (subarea == null)
            {
                return NotFound();
            }

            return subarea;
        }

        // PUT: api/Subareas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutSubarea([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Subarea subarea = JsonConvert.DeserializeObject<Subarea>(data);

                Subarea update = await _context.Subareas.FindAsync(subarea.SubareaId);

                if (update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Subarea no encontrada";
                }
                else
                {
                    update.cDescripcion = subarea.cDescripcion;
                    update.AreaId = subarea.AreaId;

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

        // POST: api/Subareas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostSubarea([FromForm]string data)
        {
            Response res = new Response();
            try
            {
                Subarea subarea = JsonConvert.DeserializeObject<Subarea>(data);
                Subarea insert = new Subarea
                {
                    cDescripcion = subarea.cDescripcion,
                    bEstatus = subarea.bEstatus,
                    AreaId = subarea.AreaId
                };
                _context.Subareas.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.SubareaId;

            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }

            return res;
        }

        // DELETE: api/Subareas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteSubarea(int id)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                Subarea delete = await _context.Subareas.FindAsync(id);
                if (delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Subarea no encontrada";
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

        private bool SubareaExists(int id)
        {
            return _context.Subareas.Any(e => e.SubareaId == id);
        }
    }
}
