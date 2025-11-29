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
        }
    }
}
