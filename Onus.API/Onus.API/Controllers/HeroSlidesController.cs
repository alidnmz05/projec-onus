using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HeroSlidesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public HeroSlidesController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<HeroSlide>>> GetHeroSlides()
    {
        return await _context.HeroSlides
            .Where(s => s.IsActive)
            .OrderBy(s => s.Order)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<HeroSlide>> GetHeroSlide(int id)
    {
        var slide = await _context.HeroSlides.FindAsync(id);
        if (slide == null) return NotFound();
        return slide;
    }

    [HttpPost]
    public async Task<ActionResult<HeroSlide>> CreateHeroSlide(HeroSlide slide)
    {
        _context.HeroSlides.Add(slide);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetHeroSlide), new { id = slide.Id }, slide);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateHeroSlide(int id, HeroSlide slide)
    {
        if (id != slide.Id) return BadRequest();
        
        _context.Entry(slide).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.HeroSlides.AnyAsync(e => e.Id == id))
                return NotFound();
            throw;
        }
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteHeroSlide(int id)
    {
        var slide = await _context.HeroSlides.FindAsync(id);
        if (slide == null) return NotFound();
        
        _context.HeroSlides.Remove(slide);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
