# ONUS.COM.TR Deployment Rehberi

## 🚀 Hızlı Deployment

### 1. Sunucuya Bağlan
```bash
ssh root@178.208.187.213
# veya
ssh kullanici@onus.com.tr
```

### 2. Projeyi Clone Et (İlk Kurulum)
```bash
cd /var/www
git clone <repository-url> onus
cd onus
```

### 3. Nginx Kurulum ve Yapılandırma
```bash
cd /var/www/onus
chmod +x setup-nginx.sh
sudo ./setup-nginx.sh
```

Bu script:
- ✅ Nginx konfigürasyonunu onus.com.tr için oluşturur
- ✅ Frontend'i port 3000'den servis eder
- ✅ Backend API'yi /api/* yolu ile yönlendirir
- ✅ HTTPS yönlendirmesi yapar

### 4. SSL Sertifikası (Let's Encrypt)
```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx -y
sudo certbot --nginx -d onus.com.tr -d www.onus.com.tr
```

### 5. Backend Deployment
```bash
cd /var/www/onus
chmod +x deploy-backend.sh
./deploy-backend.sh
```

Bu script:
- ✅ .NET 8.0 ile backend'i build eder
- ✅ Production ayarları ile publish eder
- ✅ Systemd service olarak çalıştırır
- ✅ Port 5001'de API'yi başlatır

### 6. Frontend Deployment
```bash
cd /var/www/onus
chmod +x deploy-frontend.sh
./deploy-frontend.sh
```

Bu script:
- ✅ Node.js bağımlılıklarını yükler
- ✅ Production build oluşturur
- ✅ PM2 ile frontend'i başlatır
- ✅ Port 3000'de uygulama çalışır

## 📋 Deployment Checklist

- [ ] DNS ayarları yapıldı (onus.com.tr → 178.208.187.213)
- [ ] Sunucuya SSH erişimi sağlandı
- [ ] Git repository clone edildi
- [ ] Nginx kuruldu ve yapılandırıldı
- [ ] SSL sertifikası alındı
- [ ] Backend deploy edildi
- [ ] Frontend deploy edildi
- [ ] Sitede test yapıldı

## 🔄 Güncelleme Yapma

### Kod değişikliklerinden sonra:

```bash
# Sunucuya bağlan
ssh root@178.208.187.213

# Kodu çek
cd /var/www/onus
git pull origin main

# Backend'i güncelle
./deploy-backend.sh

# Frontend'i güncelle
./deploy-frontend.sh
```

## 🔍 Durum Kontrol

### Backend Durumu
```bash
sudo systemctl status onus-api
journalctl -u onus-api -f  # Log takibi
```

### Frontend Durumu
```bash
pm2 status
pm2 logs onus-frontend
```

### Nginx Durumu
```bash
sudo systemctl status nginx
sudo nginx -t  # Konfigürasyon testi
```

## 🌐 URL Yapısı

- **Ana Site**: https://onus.com.tr
- **WWW**: https://www.onus.com.tr
- **API**: https://onus.com.tr/api
- **API Endpoints**:
  - `GET /api/projects` - Projeler
  - `GET /api/blog` - Blog yazıları
  - `GET /api/references` - Referanslar
  - `GET /api/testimonials` - Müşteri yorumları
  - `GET /api/statistics` - İstatistikler
  - `POST /api/contact` - İletişim formu

## 🔧 Port Yapılandırması

| Servis | Port | Erişim |
|--------|------|--------|
| Nginx | 80, 443 | Public |
| Frontend | 3000 | Internal (Nginx proxy) |
| Backend API | 5001 | Internal (Nginx proxy) |

## 📝 Önemli Notlar

1. **CORS**: Backend'de onus.com.tr için CORS ayarları yapıldı
2. **HTTPS**: Let's Encrypt ile ücretsiz SSL
3. **Auto-restart**: PM2 ve systemd servisleri otomatik yeniden başlar
4. **Logs**: `/var/log/nginx/` altında nginx logları

## 🆘 Sorun Giderme

### Site açılmıyor
```bash
sudo systemctl restart nginx
pm2 restart onus-frontend
sudo systemctl restart onus-api
```

### SSL hatası
```bash
sudo certbot renew --dry-run
```

### API çalışmıyor
```bash
sudo systemctl status onus-api
journalctl -u onus-api -n 50
```

### Frontend build hatası
```bash
cd /var/www/onus/onus-frontend
npm install
npm run build
pm2 restart onus-frontend
```

## 📞 Destek

Sorun yaşarsanız deployment loglarını kontrol edin:
```bash
# Backend
journalctl -u onus-api -n 100

# Frontend
pm2 logs onus-frontend --lines 100

# Nginx
tail -f /var/log/nginx/error.log
```
