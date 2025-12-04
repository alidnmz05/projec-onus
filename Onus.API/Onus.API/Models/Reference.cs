namespace Onus.API.Models;

public class Reference
{
    public int Id { get; set; }
    public string CompanyName { get; set; } = string.Empty;
    public string Logo { get; set; } = string.Empty;
    public string Industry { get; set; } = string.Empty;
    public int Year { get; set; }
    public string Website { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
}
