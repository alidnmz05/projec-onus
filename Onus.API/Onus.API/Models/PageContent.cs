namespace Onus.API.Models;

public class PageContent
{
    public int Id { get; set; }
    public string Page { get; set; } = string.Empty; // "home", "about", "cta", "footer"
    public string Section { get; set; } = string.Empty; // "hero", "about-intro", "cta-main"
    public string ContentKey { get; set; } = string.Empty; // "title", "description", "image"
    public string ContentValue { get; set; } = string.Empty;
}
