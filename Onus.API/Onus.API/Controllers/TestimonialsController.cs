using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TestimonialsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public TestimonialsController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Testimonial>>> GetTestimonials()
        {
            var testimonials = await _context.Testimonials
                .Where(t => t.IsApproved)
                .OrderByDescending(t => t.CreatedDate)
                .ToListAsync();

            return Ok(testimonials);
        }

        [HttpPost]
        public async Task<ActionResult<Testimonial>> CreateTestimonial(Testimonial testimonial)
        {
            testimonial.CreatedDate = DateTime.UtcNow;
            testimonial.IsApproved = false; // Requires admin approval

            _context.Testimonials.Add(testimonial);
            await _context.SaveChangesAsync();

            return Ok(new { success = true, message = "Yorumunuz incelendikten sonra yayınlanacaktır." });
        }

        [HttpPut("{id}/approve")]
        public async Task<IActionResult> ApproveTestimonial(int id)
        {
            var testimonial = await _context.Testimonials.FindAsync(id);
            if (testimonial == null)
            {
                return NotFound();
            }

            testimonial.IsApproved = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTestimonial(int id)
        {
            var testimonial = await _context.Testimonials.FindAsync(id);
            if (testimonial == null)
            {
                return NotFound();
            }

            _context.Testimonials.Remove(testimonial);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
