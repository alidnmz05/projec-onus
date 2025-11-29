# 🚀 ONUS Mutfak & Banyo - Hızlı Başlangıç

## Projeyi Çalıştırma

### 1️⃣ Frontend'i Başlatın

```powershell
cd onus-frontend
npm install
npm run dev
```

Tarayıcınızda açın: **http://localhost:3000**

### 2️⃣ Backend API'yi Başlatın (Opsiyonel)

```powershell
cd Onus.API\Onus.API
dotnet restore
dotnet run
```

API: **https://localhost:5001**
Swagger UI: **https://localhost:5001/swagger**

---

## 📸 Kendi Görselerinizi Ekleyin

### Logo
1. Verdiğiniz ONUS logosunu PNG/SVG formatında kaydedin
2. `onus-frontend/public/` klasörüne `logo.png` veya `logo.svg` olarak kopyalayın
3. Şu an placeholder bir logo var, kendi logonuzla değiştirin

### Proje Görselleri
- `/public/images/projects/` klasörü oluşturun
- Proje görsellerinizi buraya ekleyin
- Admin panelinden veya doğrudan kodda URL'leri güncelleyin

### Videolar
- Hero section'da video eklemek için:
  - `src/components/home/Hero.tsx` dosyasını açın
  - Background image yerine `<video>` elementi ekleyin
  - Örnek: `/public/videos/hero-video.mp4`

---

## 🎨 Özelleştirme

### Renkler
`tailwind.config.js` dosyasında primary renkleri değiştirin:

```javascript
primary: {
  600: '#dc2626', // Ana kırmızı
  700: '#b91c1c', // Koyu kırmızı
}
```

### İçerik
- **Ana Sayfa**: `src/components/home/` klasöründeki dosyalar
- **Sayfalar**: `src/pages/` klasörü
- **Admin Panel**: `src/components/admin/` klasörü

---

## 🔑 Admin Paneli

**URL**: http://localhost:3000/admin

**Demo Giriş**:
- Kullanıcı: `admin`
- Şifre: `admin123`

### Özellikler:
- ✅ Dashboard - Genel istatistikler
- ✅ Proje yönetimi (CRUD)
- ✅ Blog yönetimi
- ✅ Site ayarları
- ✅ İletişim mesajları

---

## 📱 Sayfalar

1. **Ana Sayfa** (/) - Hero, özellikler, projeler showcase
2. **Projeler** (/projeler) - Filtrelenebilir galeri
3. **Hakkımızda** (/hakkimizda) - Şirket bilgileri
4. **Blog** (/blog) - Blog yazıları
5. **İletişim** (/iletisim) - İletişim formu

---

## 🎯 Sonraki Adımlar

### Kendi İçeriğinizi Ekleyin:
1. ✅ Logoyu değiştirin (`/public/logo.svg`)
2. ✅ Proje görsellerini ekleyin
3. ✅ Hakkımızda sayfasını doldurun
4. ✅ İletişim bilgilerini güncelleyin
5. ✅ Blog yazıları ekleyin

### Canlıya Alın:
1. **Frontend**: Vercel, Netlify veya GitHub Pages
2. **Backend**: Azure, AWS veya başka bir hosting

### Database (Production için):
- `Program.cs` dosyasında InMemoryDatabase yerine SQL Server ekleyin:

```csharp
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
```

---

## 💡 İpuçları

- Tüm placeholder görseller Unsplash'tan
- Kendi görsellerinizi ekledikçe URL'leri güncelleyin
- Admin panelden dinamik yönetim yapabilirsiniz
- Mobil uyumlu, responsive tasarım hazır

---

## 📞 Yardım

Sorun yaşarsanız:
1. `npm install` komutunu tekrar çalıştırın
2. Node.js versiyonunu kontrol edin (v18+)
3. .NET SDK 8.0 kurulu olmalı

**Başarılar! 🎉**
