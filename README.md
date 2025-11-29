# ONUS Mutfak & Banyo - Modern Web Sitesi

Modern, dinamik ve göz alıcı bir web sitesi. React, TypeScript, Tailwind CSS ve Framer Motion ile geliştirilmiştir.

## 🚀 Özellikler

### Frontend
- ⚡ **React 18** + **TypeScript** + **Vite** - Hızlı ve modern geliştirme
- 🎨 **Tailwind CSS** - Özelleştirilebilir modern tasarım
- ✨ **Framer Motion** - Akıcı animasyonlar ve geçişler
- 🖼️ **Swiper** - Dinamik slider/carousel
- 📱 **Responsive** - Tüm cihazlarda mükemmel görünüm
- 🎯 **React Router** - SPA navigasyon
- 🎭 **Modern UI/UX** - Göz alıcı ve kullanıcı dostu arayüz

### Admin Paneli
- 📊 Dashboard - Genel bakış ve istatistikler
- 📁 Proje Yönetimi - CRUD işlemleri
- 📝 Blog Yönetimi - İçerik yönetimi
- ⚙️ Ayarlar - Site konfigürasyonu
- 🔐 Güvenli giriş sistemi

### Ana Sayfada
- 🌟 Hero slider - Etkileyici giriş bölümü
- 💎 Özellikler - Servisleri tanıtım
- 🖼️ Proje galerisi - Dinamik filtreleme
- 📈 İstatistikler - Sayaçlar ve başarılar
- 💬 Müşteri yorumları - Sosyal kanıt
- 📞 Call-to-action - İletişim çağrısı

## 📦 Kurulum

### Frontend

```bash
cd onus-frontend
npm install
npm run dev
```

Tarayıcıda açın: `http://localhost:3000`

### Backend (ASP.NET Core)

```bash
cd Onus.API/Onus.API
dotnet restore
dotnet run
```

API: `https://localhost:5001`

## 🎨 Renk Paleti

- **Primary**: Kırmızı (#dc2626 - #b91c1c)
- **Dark**: Koyu gri tonları
- **Accent**: Dinamik gradient'ler

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔐 Admin Paneli Girişi

**Demo Hesap:**
- Kullanıcı adı: `admin`
- Şifre: `admin123`

URL: `http://localhost:3000/admin`

## 📄 Sayfalar

1. **Ana Sayfa** (`/`) - Hero, özellikler, projeler, istatistikler
2. **Projeler** (`/projeler`) - Filtrelenebilir proje galerisi
3. **Hakkımızda** (`/hakkimizda`) - Şirket bilgileri, değerler
4. **Blog** (`/blog`) - Yazılar ve içerikler
5. **İletişim** (`/iletisim`) - İletişim formu ve bilgiler
6. **Admin** (`/admin/*`) - Yönetim paneli

## 🛠️ Teknolojiler

### Frontend
- React 18.3
- TypeScript 5.9
- Vite 7.2
- Tailwind CSS 3.4
- Framer Motion 11.5
- React Router 6.26
- Swiper 11.1
- React Icons 5.3
- Axios 1.7

### Planlanan Backend
- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- RESTful API

## 🎯 Geliştirme Notları

### Görsel ve Videolar
Şu an için görseller Unsplash'tan placeholder olarak kullanılıyor. Kendi görsel ve videolarınızı eklemek için:

1. `/public` klasörüne medya dosyalarınızı ekleyin
2. Komponentlerde URL'leri güncelleyin
3. Veya backend'den dinamik olarak çekin

### Logo
Logo dosyası `/public/logo.png` konumunda olmalı. Verdiğiniz ONUS logosunu oraya koyun.

## 🚀 Production Build

```bash
npm run build
```

Build dosyaları `dist/` klasöründe oluşturulur.

## 📞 İletişim

Web: www.onus.com.tr (örnek)
Email: info@onus.com.tr
Tel: +90 555 555 55 55

---

**"Doğanın Çırağı, Ahşabın Ustası"**

ONUS Mutfak & Banyo © 2024
