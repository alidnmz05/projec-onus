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
        public DbSet<HeroSlide> HeroSlides { get; set; }
        public DbSet<Statistic> Statistics { get; set; }
        public DbSet<PageContent> PageContents { get; set; }

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

            // Seed hero slides
            modelBuilder.Entity<HeroSlide>().HasData(
                new HeroSlide
                {
                    Id = 1,
                    Title = "Doğanın Çırağı",
                    Subtitle = "Ahşabın Ustası",
                    Description = "Özel tasarım mutfak ve banyo çözümleri ile hayallerinizdeki mekanları yaratıyoruz.",
                    ImageUrl = "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80",
                    ButtonText = "Projelerimizi Keşfedin",
                    ButtonLink = "/projeler",
                    Order = 1,
                    IsActive = true
                },
                new HeroSlide
                {
                    Id = 2,
                    Title = "El İşçiliğinde Mükemmellik",
                    Subtitle = "Her Detayda Kalite",
                    Description = "Yılların deneyimi ile ahşap işçiliğinde en üst düzey kaliteyi sunuyoruz.",
                    ImageUrl = "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=80",
                    ButtonText = "Hakkımızda",
                    ButtonLink = "/hakkimizda",
                    Order = 2,
                    IsActive = true
                },
                new HeroSlide
                {
                    Id = 3,
                    Title = "Modern ve Zamansız Tasarımlar",
                    Subtitle = "Hayalleriniz, Bizim İşimiz",
                    Description = "Butik üretim anlayışı ile size özel mutfak ve banyo çözümleri.",
                    ImageUrl = "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80",
                    ButtonText = "İletişime Geçin",
                    ButtonLink = "/iletisim",
                    Order = 3,
                    IsActive = true
                }
            );

            // Seed statistics
            modelBuilder.Entity<Statistic>().HasData(
                new Statistic
                {
                    Id = 1,
                    Title = "Tamamlanan Proje",
                    Value = "500+",
                    Icon = "CheckCircle",
                    Order = 1
                },
                new Statistic
                {
                    Id = 2,
                    Title = "Mutlu Müşteri",
                    Value = "98%",
                    Icon = "Heart",
                    Order = 2
                },
                new Statistic
                {
                    Id = 3,
                    Title = "Yıllık Deneyim",
                    Value = "15+",
                    Icon = "Award",
                    Order = 3
                },
                new Statistic
                {
                    Id = 4,
                    Title = "Uzman Ekip",
                    Value = "25+",
                    Icon = "Users",
                    Order = 4
                }
            );

            // Seed page contents - CTA Section
            modelBuilder.Entity<PageContent>().HasData(
                new PageContent
                {
                    Id = 1,
                    Page = "home",
                    Section = "cta",
                    ContentKey = "title",
                    ContentValue = "Projeniz İçin Ücretsiz Teklif Alın"
                },
                new PageContent
                {
                    Id = 2,
                    Page = "home",
                    Section = "cta",
                    ContentKey = "description",
                    ContentValue = "Uzman ekibimiz hayallerinizdeki mutfak ve banyo tasarımını gerçeğe dönüştürmeye hazır. Hemen iletişime geçin, ücretsiz keşif ve teklif hizmetinden faydalanın."
                },
                new PageContent
                {
                    Id = 3,
                    Page = "home",
                    Section = "cta",
                    ContentKey = "buttonText",
                    ContentValue = "İletişime Geçin"
                },
                new PageContent
                {
                    Id = 4,
                    Page = "home",
                    Section = "cta",
                    ContentKey = "buttonLink",
                    ContentValue = "/iletisim"
                },
                // Footer content
                new PageContent
                {
                    Id = 5,
                    Page = "footer",
                    Section = "main",
                    ContentKey = "description",
                    ContentValue = "Doğanın çırağı, ahşabın ustası. ONUS Mutfak & Banyo olarak özel tasarım mutfak ve banyo çözümleri sunuyoruz."
                },
                new PageContent
                {
                    Id = 6,
                    Page = "footer",
                    Section = "main",
                    ContentKey = "address",
                    ContentValue = "İstanbul, Türkiye"
                },
                new PageContent
                {
                    Id = 7,
                    Page = "footer",
                    Section = "main",
                    ContentKey = "phone",
                    ContentValue = "+90 555 555 55 55"
                },
                new PageContent
                {
                    Id = 8,
                    Page = "footer",
                    Section = "main",
                    ContentKey = "email",
                    ContentValue = "info@onus.com.tr"
                },
                // About page content
                new PageContent
                {
                    Id = 9,
                    Page = "about",
                    Section = "hero",
                    ContentKey = "title",
                    ContentValue = "Hakkımızda"
                },
                new PageContent
                {
                    Id = 10,
                    Page = "about",
                    Section = "hero",
                    ContentKey = "subtitle",
                    ContentValue = "Doğanın Çırağı, Ahşabın Ustası"
                },
                new PageContent
                {
                    Id = 11,
                    Page = "about",
                    Section = "content",
                    ContentKey = "mainText",
                    ContentValue = "ONUS Mutfak & Banyo olarak 15 yılı aşkın süredir, doğal ahşabın sıcaklığını modern tasarımla buluşturarak hayallerinizdeki mekanları yaratıyoruz. Butik üretim anlayışımız ile her projeye özel çözümler sunuyor, el işçiliğinde mükemmelliği hedefliyoruz."
                }
            );
        }
    }
}
