using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StatisticsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public StatisticsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Statistic>>> GetStatistics()
    {
        return await _context.Statistics
            .OrderBy(s => s.Order)
            .ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Statistic>> GetStatistic(int id)
    {
        var statistic = await _context.Statistics.FindAsync(id);
        if (statistic == null) return NotFound();
        return statistic;
    }

    [HttpPost]
    public async Task<ActionResult<Statistic>> CreateStatistic(Statistic statistic)
    {
        _context.Statistics.Add(statistic);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetStatistic), new { id = statistic.Id }, statistic);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateStatistic(int id, Statistic statistic)
    {
        if (id != statistic.Id) return BadRequest();
        
        _context.Entry(statistic).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.Statistics.AnyAsync(e => e.Id == id))
                return NotFound();
            throw;
        }
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteStatistic(int id)
    {
        var statistic = await _context.Statistics.FindAsync(id);
        if (statistic == null) return NotFound();
        
        _context.Statistics.Remove(statistic);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }
}
