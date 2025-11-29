using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ContactController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ContactMessage>> SendMessage(ContactMessage message)
        {
            message.CreatedDate = DateTime.UtcNow;
            message.IsRead = false;

            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();

            // Here you can add email notification logic

            return Ok(new { success = true, message = "Mesajınız başarıyla gönderildi!" });
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ContactMessage>>> GetMessages()
        {
            var messages = await _context.ContactMessages
                .OrderByDescending(m => m.CreatedDate)
                .ToListAsync();

            return Ok(messages);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message == null)
            {
                return NotFound();
            }

            message.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
