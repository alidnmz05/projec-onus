using Microsoft.EntityFrameworkCore;
using Onus.API.Models;

namespace Onus.API.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Project> Projects { get; set; }
        public DbSet<BlogPost> BlogPosts { get; set; }
        public DbSet<Testimonial> Testimonials { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<SiteSettings> SiteSettings { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Reference> References { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Seed initial data
            modelBuilder.Entity<SiteSettings>().HasData(
                new SiteSettings
                {
                    Id = 1,
                    SiteName = "ONUS Mutfak & Banyo",
                    Email = "info@onus.com.tr",
                    Phone = "+90 555 555 55 55",
                    Address = "Doğanın Çırağı, Ahşabın Ustası\nİstanbul, Türkiye",
                    FacebookUrl = "https://facebook.com",
                    InstagramUrl = "https://instagram.com",
                    WhatsAppNumber = "+905555555555"
                }
            );

            // Seed admin user (password: admin123)
            modelBuilder.Entity<User>().HasData(
                new User
                {
                    Id = 1,
                    Username = "admin",
                    Email = "admin@onus.com.tr",
                    PasswordHash = "$2a$11$8ZqrDdGvEF.YzCnJ5RqWy.vKJ4Zxh5LqXk9Kx8JYxJz5Kz8JYxJz5K", // This should be hashed
                    Role = "Admin"
                }
            );

            // Seed sample projects
            modelBuilder.Entity<Project>().HasData(
                new Project
                {
                    Id = 1,
                    Title = "Modern Mutfak Tasarımı",
                    Description = "Minimal ve fonksiyonel mutfak çözümü",
                    Category = "Mutfak",
                    ImageUrl = "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
                    Details = "Bu projede açık mutfak konsepti ile salon birleştirildi.",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                },
                new Project
                {
                    Id = 2,
                    Title = "Lüks Banyo Projesi",
                    Description = "Spa konseptli modern banyo tasarımı",
                    Category = "Banyo",
                    ImageUrl = "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80",
                    Details = "Doğal taş kaplama ve özel aydınlatma ile spa atmosferi yaratıldı.",
                    IsActive = true,
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed sample blog posts
            modelBuilder.Entity<BlogPost>().HasData(
                new BlogPost
                {
                    Id = 1,
                    Title = "Modern Mutfak Tasarım Trendleri 2024",
                    Excerpt = "Mutfak tasarımında 2024 yılının en öne çıkan trendlerini keşfedin.",
                    Content = "Detaylı blog içeriği buraya gelecek...",
                    Category = "Mutfak",
                    ImageUrl = "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80",
                    IsPublished = true,
                    PublishedDate = DateTime.UtcNow,
                    CreatedDate = DateTime.UtcNow
                }
            );

            // Seed sample references
            modelBuilder.Entity<Reference>().HasData(
                new Reference
                {
                    Id = 1,
                    CompanyName = "Hilton Hotels",
                    Logo = "https://upload.wikimedia.org/wikipedia/commons/4/44/Hilton_Worldwide_Logo.svg",
                    Industry = "Otelcilik",
                    Year = 2023,
                    Website = "https://www.hilton.com",
                    Description = "5 yıldızlı otel mutfak ve banyo tadilat projesi"
                },
                new Reference
                {
                    Id = 2,
                    CompanyName = "Starbucks",
                    Logo = "https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg",
                    Industry = "Restoran",
                    Year = 2024,
                    Website = "https://www.starbucks.com",
                    Description = "Cafe mobilya ve dekorasyon projeleri"
                },
                new Reference
                {
                    Id = 3,
                    CompanyName = "Mercedes-Benz",
                    Logo = "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg",
                    Industry = "Otomotiv",
                    Year = 2023,
                    Website = "https://www.mercedes-benz.com",
                    Description = "Showroom ve ofis iç mekan projesi"
                }
            );
        }
    }
}
