using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Onus.API.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "BlogPosts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Excerpt = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Author = table.Column<string>(type: "text", nullable: false),
                    IsPublished = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    PublishedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_BlogPosts", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ContactMessages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Subject = table.Column<string>(type: "text", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContactMessages", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "HeroSlides",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Subtitle = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    ButtonText = table.Column<string>(type: "text", nullable: false),
                    ButtonLink = table.Column<string>(type: "text", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_HeroSlides", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "PageContents",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Page = table.Column<string>(type: "text", nullable: false),
                    Section = table.Column<string>(type: "text", nullable: false),
                    ContentKey = table.Column<string>(type: "text", nullable: false),
                    ContentValue = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PageContents", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Details = table.Column<string>(type: "text", nullable: true),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "References",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    CompanyName = table.Column<string>(type: "text", nullable: false),
                    Logo = table.Column<string>(type: "text", nullable: false),
                    Industry = table.Column<string>(type: "text", nullable: false),
                    Year = table.Column<int>(type: "integer", nullable: false),
                    Website = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_References", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "SiteSettings",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    SiteName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false),
                    Address = table.Column<string>(type: "text", nullable: false),
                    FacebookUrl = table.Column<string>(type: "text", nullable: false),
                    InstagramUrl = table.Column<string>(type: "text", nullable: false),
                    WhatsAppNumber = table.Column<string>(type: "text", nullable: false),
                    UpdatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SiteSettings", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Value = table.Column<string>(type: "text", nullable: false),
                    Icon = table.Column<string>(type: "text", nullable: false),
                    Order = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Testimonials",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    Content = table.Column<string>(type: "text", nullable: false),
                    ImageUrl = table.Column<string>(type: "text", nullable: false),
                    Rating = table.Column<int>(type: "integer", nullable: false),
                    IsApproved = table.Column<bool>(type: "boolean", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Testimonials", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Username = table.Column<string>(type: "text", nullable: false),
                    PasswordHash = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    Role = table.Column<string>(type: "text", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    LastLoginDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "BlogPosts",
                columns: new[] { "Id", "Author", "Category", "Content", "CreatedDate", "Excerpt", "ImageUrl", "IsPublished", "PublishedDate", "Title", "UpdatedDate" },
                values: new object[] { 1, "Admin", "Mutfak", "Detaylı blog içeriği buraya gelecek...", new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8887), "Mutfak tasarımında 2024 yılının en öne çıkan trendlerini keşfedin.", "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80", true, new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8884), "Modern Mutfak Tasarım Trendleri 2024", null });

            migrationBuilder.InsertData(
                table: "HeroSlides",
                columns: new[] { "Id", "ButtonLink", "ButtonText", "Description", "ImageUrl", "IsActive", "Order", "Subtitle", "Title" },
                values: new object[,]
                {
                    { 1, "/projeler", "Projelerimizi Keşfedin", "Özel tasarım mutfak ve banyo çözümleri ile hayallerinizdeki mekanları yaratıyoruz.", "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1920&q=80", true, 1, "Ahşabın Ustası", "Doğanın Çırağı" },
                    { 2, "/hakkimizda", "Hakkımızda", "Yılların deneyimi ile ahşap işçiliğinde en üst düzey kaliteyi sunuyoruz.", "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=1920&q=80", true, 2, "Her Detayda Kalite", "El İşçiliğinde Mükemmellik" },
                    { 3, "/iletisim", "İletişime Geçin", "Butik üretim anlayışı ile size özel mutfak ve banyo çözümleri.", "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1920&q=80", true, 3, "Hayalleriniz, Bizim İşimiz", "Modern ve Zamansız Tasarımlar" }
                });

            migrationBuilder.InsertData(
                table: "PageContents",
                columns: new[] { "Id", "ContentKey", "ContentValue", "Page", "Section" },
                values: new object[,]
                {
                    { 1, "title", "Projeniz İçin Ücretsiz Teklif Alın", "home", "cta" },
                    { 2, "description", "Uzman ekibimiz hayallerinizdeki mutfak ve banyo tasarımını gerçeğe dönüştürmeye hazır. Hemen iletişime geçin, ücretsiz keşif ve teklif hizmetinden faydalanın.", "home", "cta" },
                    { 3, "buttonText", "İletişime Geçin", "home", "cta" },
                    { 4, "buttonLink", "/iletisim", "home", "cta" },
                    { 5, "description", "Doğanın çırağı, ahşabın ustası. ONUS Mutfak & Banyo olarak özel tasarım mutfak ve banyo çözümleri sunuyoruz.", "footer", "main" },
                    { 6, "address", "İstanbul, Türkiye", "footer", "main" },
                    { 7, "phone", "+90 555 555 55 55", "footer", "main" },
                    { 8, "email", "info@onus.com.tr", "footer", "main" },
                    { 9, "title", "Hakkımızda", "about", "hero" },
                    { 10, "subtitle", "Doğanın Çırağı, Ahşabın Ustası", "about", "hero" },
                    { 11, "mainText", "ONUS Mutfak & Banyo olarak 15 yılı aşkın süredir, doğal ahşabın sıcaklığını modern tasarımla buluşturarak hayallerinizdeki mekanları yaratıyoruz. Butik üretim anlayışımız ile her projeye özel çözümler sunuyor, el işçiliğinde mükemmelliği hedefliyoruz.", "about", "content" }
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Category", "CreatedDate", "Description", "Details", "ImageUrl", "IsActive", "Title", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "Mutfak", new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8852), "Minimal ve fonksiyonel mutfak çözümü", "Bu projede açık mutfak konsepti ile salon birleştirildi.", "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80", true, "Modern Mutfak Tasarımı", null },
                    { 2, "Banyo", new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8854), "Spa konseptli modern banyo tasarımı", "Doğal taş kaplama ve özel aydınlatma ile spa atmosferi yaratıldı.", "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&w=800&q=80", true, "Lüks Banyo Projesi", null }
                });

            migrationBuilder.InsertData(
                table: "References",
                columns: new[] { "Id", "CompanyName", "Description", "Industry", "Logo", "Website", "Year" },
                values: new object[,]
                {
                    { 1, "Hilton Hotels", "5 yıldızlı otel mutfak ve banyo tadilat projesi", "Otelcilik", "https://upload.wikimedia.org/wikipedia/commons/4/44/Hilton_Worldwide_Logo.svg", "https://www.hilton.com", 2023 },
                    { 2, "Starbucks", "Cafe mobilya ve dekorasyon projeleri", "Restoran", "https://upload.wikimedia.org/wikipedia/en/d/d3/Starbucks_Corporation_Logo_2011.svg", "https://www.starbucks.com", 2024 },
                    { 3, "Mercedes-Benz", "Showroom ve ofis iç mekan projesi", "Otomotiv", "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", "https://www.mercedes-benz.com", 2023 }
                });

            migrationBuilder.InsertData(
                table: "SiteSettings",
                columns: new[] { "Id", "Address", "Email", "FacebookUrl", "InstagramUrl", "Phone", "SiteName", "UpdatedDate", "WhatsAppNumber" },
                values: new object[] { 1, "Doğanın Çırağı, Ahşabın Ustası\nİstanbul, Türkiye", "info@onus.com.tr", "https://facebook.com", "https://instagram.com", "+90 555 555 55 55", "ONUS Mutfak & Banyo", new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8626), "+905555555555" });

            migrationBuilder.InsertData(
                table: "Statistics",
                columns: new[] { "Id", "Icon", "Order", "Title", "Value" },
                values: new object[,]
                {
                    { 1, "CheckCircle", 1, "Tamamlanan Proje", "500+" },
                    { 2, "Heart", 2, "Mutlu Müşteri", "98%" },
                    { 3, "Award", 3, "Yıllık Deneyim", "15+" },
                    { 4, "Users", 4, "Uzman Ekip", "25+" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CreatedDate", "Email", "LastLoginDate", "PasswordHash", "Role", "Username" },
                values: new object[] { 1, new DateTime(2025, 12, 8, 9, 39, 54, 92, DateTimeKind.Utc).AddTicks(8820), "admin@onus.com.tr", null, "$2a$11$8ZqrDdGvEF.YzCnJ5RqWy.vKJ4Zxh5LqXk9Kx8JYxJz5Kz8JYxJz5K", "Admin", "admin" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "BlogPosts");

            migrationBuilder.DropTable(
                name: "ContactMessages");

            migrationBuilder.DropTable(
                name: "HeroSlides");

            migrationBuilder.DropTable(
                name: "PageContents");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "References");

            migrationBuilder.DropTable(
                name: "SiteSettings");

            migrationBuilder.DropTable(
                name: "Statistics");

            migrationBuilder.DropTable(
                name: "Testimonials");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
