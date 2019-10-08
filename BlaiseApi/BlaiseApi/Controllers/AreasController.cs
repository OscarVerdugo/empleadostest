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
using Newtonsoft.Json;
using BlaiseApi.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace BlaiseApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Consumes("application/x-www-form-urlencoded")]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class AreasController : ControllerBase
    {
        private readonly ContextDB _context;

        public AreasController(ContextDB context)
        {
            _context = context;
        }

        // GET: api/Areas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Area>>> GetAreas()
        {
            return await _context.Areas.OrderByDescending(x => x.AreaId).ToListAsync();
        }

        // GET: api/Areas/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Area>> GetArea(int id)
        {
            var area = await _context.Areas.FindAsync(id);

            if (area == null)
            {
                return NotFound();
            }

            return area;
        }

        // PUT: api/Areas/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut]
        public async Task<Response> PutArea([FromForm]string data, [FromForm] string token)
        {
            Response res = new Response();
            try
            {
                Area area = JsonConvert.DeserializeObject<Area>(data);

                Area update = await _context.Areas.FindAsync(area.AreaId);

                if(update == null)
                {
                    res.bError = true;
                    res.cMensaje = "Area no encontrada";
                }
                else
                {
                    update.cDescripcion = area.cDescripcion;
                    _context.Entry(update).State = EntityState.Modified;

                    await _context.SaveChangesAsync();
                }
            }
            catch(Exception ex)
            {
                res.bError = true;
                res.cMensaje = ex.Message;
            }

            return res;
        }

        // POST: api/Areas
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Response>> PostArea([FromForm]string data,[FromForm]string token)
        {
            Response res = new Response();
            try
            {
                Area area = JsonConvert.DeserializeObject<Area>(data);
                Area insert = new Area
                {
                    cDescripcion = area.cDescripcion,
                    bEstatus = area.bEstatus
                };
                _context.Areas.Add(insert);
                await _context.SaveChangesAsync();

                res.nPayload = insert.AreaId;
                
                res.cMensaje = token;
            }
            catch (Exception er)
            {
                res.bError = true;
                res.cMensaje = er.Message;
            }
            

            //return CreatedAtAction("GetArea", new { id = area.AreaId }, area);
            return res;
        }

        // DELETE: api/Areas/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Response>> DeleteArea(int id, string token)
        {
            Response res = new Response();
            try
            {
                //Area area = JsonConvert.DeserializeObject<Area>(data);

                Area delete = await _context.Areas.FindAsync(id);
                if(delete == null)
                {
                    res.bError = true;
                    res.cMensaje = "Area no encontrada";
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

        private bool AreaExists(int id)
        {
            return _context.Areas.Any(e => e.AreaId == id);
        }
    }
}
