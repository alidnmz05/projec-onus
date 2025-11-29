using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public SettingsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<SiteSettings>> GetSettings()
        {
            var settings = await _context.SiteSettings.FirstOrDefaultAsync();
            
            if (settings == null)
            {
                settings = new SiteSettings { Id = 1 };
                _context.SiteSettings.Add(settings);
                await _context.SaveChangesAsync();
            }

            return Ok(settings);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSettings(SiteSettings settings)
        {
            var existing = await _context.SiteSettings.FirstOrDefaultAsync();
            
            if (existing == null)
            {
                return NotFound();
            }

            existing.SiteName = settings.SiteName;
            existing.Email = settings.Email;
            existing.Phone = settings.Phone;
            existing.Address = settings.Address;
            existing.FacebookUrl = settings.FacebookUrl;
            existing.InstagramUrl = settings.InstagramUrl;
            existing.WhatsAppNumber = settings.WhatsAppNumber;
            existing.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(existing);
        }
    }
}
