using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Onus.API.Data;
using Onus.API.Models;

namespace Onus.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PageContentsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public PageContentsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PageContent>>> GetPageContents([FromQuery] string? page = null, [FromQuery] string? section = null)
    {
        var query = _context.PageContents.AsQueryable();
        
        if (!string.IsNullOrEmpty(page))
            query = query.Where(p => p.Page == page);
            
        if (!string.IsNullOrEmpty(section))
            query = query.Where(p => p.Section == section);
            
        return await query.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<PageContent>> GetPageContent(int id)
    {
        var content = await _context.PageContents.FindAsync(id);
        if (content == null) return NotFound();
        return content;
    }

    [HttpPost]
    public async Task<ActionResult<PageContent>> CreatePageContent(PageContent content)
    {
        _context.PageContents.Add(content);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetPageContent), new { id = content.Id }, content);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdatePageContent(int id, PageContent content)
    {
        if (id != content.Id) return BadRequest();
        
        _context.Entry(content).State = EntityState.Modified;
        
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await _context.PageContents.AnyAsync(e => e.Id == id))
                return NotFound();
            throw;
        }
        
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePageContent(int id)
    {
        var content = await _context.PageContents.FindAsync(id);
        if (content == null) return NotFound();
        
        _context.PageContents.Remove(content);
        await _context.SaveChangesAsync();
        
        return NoContent();
    }

    [HttpPut("bulk")]
    public async Task<IActionResult> BulkUpdatePageContents([FromBody] List<PageContent> contents)
    {
        foreach (var content in contents)
        {
            _context.Entry(content).State = EntityState.Modified;
        }
        
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
