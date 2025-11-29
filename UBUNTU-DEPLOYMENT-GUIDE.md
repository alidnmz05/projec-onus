# ONUS Projesi - Ubuntu Sunucu Deployment Rehberi
**Sunucu IP:** 178.208.187.213  
**Tarih:** 29 Kasım 2025

## ⚠️ ÖNEMLİ: Mevcut Site Korunacak
Bu rehber, mevcut çalışan sitenizi **bozmadan** yeni portlarda ONUS projesini yayınlamak için hazırlanmıştır.

---

## 📋 Önerilen Port Yapılandırması

| Servis | Port | URL |
|--------|------|-----|
| **ONUS Frontend** | 3000 | http://178.208.187.213:3000 |
| **ONUS Backend API** | 5001 | http://178.208.187.213:5001 |
| Mevcut Siteniz | ? | (Değişmeyecek) |

> **Not:** Eğer 3000 veya 5001 portları da kullanımdaysa, `3100` ve `5100` gibi portlar kullanabiliriz.

---

## 🚀 Adım Adım Kurulum

### 1️⃣ Sunucuya Bağlanın
```bash
ssh root@178.208.187.213
# veya
ssh kullanici@178.208.187.213
```

### 2️⃣ Hangi Portlar Kullanımda Kontrol Edin
```bash
# Aktif portları listele
sudo netstat -tulpn | grep LISTEN

# veya
sudo ss -tulpn | grep LISTEN
```

**Çıktıyı kontrol edin:**
- Eğer `:3000` veya `:5001` görüyorsanız, deployment scriptlerinde farklı portlar kullanacağız
- Boş portları not edin

---

### 3️⃣ Gerekli Yazılımları Kontrol/Yükleyin

#### Node.js ve npm (Frontend için)
```bash
# Mevcut versiyonu kontrol et
node --version
npm --version

# Yoksa veya eski versiyonsa yükle
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```

#### .NET 8 SDK (Backend için)
```bash
# Mevcut versiyonu kontrol et
dotnet --version

# Yoksa yükle
wget https://packages.microsoft.com/config/ubuntu/22.04/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb
rm packages-microsoft-prod.deb
sudo apt-get update
sudo apt-get install -y dotnet-sdk-8.0
```

#### PM2 (Process Manager)
```bash
# Kontrol et
pm2 --version

# Yoksa yükle
sudo npm install -g pm2

# Mevcut PM2 uygulamalarını listele (mevcut sitenizi görmek için)
pm2 list
```

---

### 4️⃣ Projeyi Sunucuya Klonlayın
```bash
# Projeler için güvenli dizin oluştur
sudo mkdir -p /var/www
cd /var/www

# GitHub'dan klonla
sudo git clone https://github.com/alidnmz05/projec-onus.git onus-project
cd onus-project

# İzinleri düzenle
sudo chown -R $USER:$USER /var/www/onus-project
```

---

### 5️⃣ Frontend'i Özel Portla Dağıtın

#### Deployment scriptini portla birlikte çalıştır:
```bash
cd /var/www/onus-project

# Script'i çalıştırılabilir yap
chmod +x deploy-frontend.sh

# ÖZEL PORT İLE ÇALIŞTIRUN (örnek: 3000)
PORT=3000 ./deploy-frontend.sh
```

**Farklı port kullanmak isterseniz:**
```bash
PORT=3100 ./deploy-frontend.sh  # 3100 portunda çalıştırır
PORT=8080 ./deploy-frontend.sh  # 8080 portunda çalıştırır
```

#### Kontrol:
```bash
pm2 list
# "onus-frontend" uygulamasını görmeli ve "online" durumda olmalı

# Browser'da test et: http://178.208.187.213:3000
```

---

### 6️⃣ Backend'i Özel Portla Dağıtın

#### Deployment scriptini portla birlikte çalıştır:
```bash
cd /var/www/onus-project

# Script'i çalıştırılabilir yap
chmod +x deploy-api.sh

# ÖZEL PORT İLE ÇALIŞTIRUN (örnek: 5001)
sudo PORT=5001 ./deploy-api.sh
```

**Farklı port kullanmak isterseniz:**
```bash
sudo PORT=5100 ./deploy-api.sh  # 5100 portunda çalıştırır
sudo PORT=7000 ./deploy-api.sh  # 7000 portunda çalıştırır
```

#### Kontrol:
```bash
sudo systemctl status onus-api
# "active (running)" durumunda olmalı

# API'yi test et:
curl http://localhost:5001/api/projects
# veya browser'da: http://178.208.187.213:5001/api/projects
```

---

### 7️⃣ Güvenlik Duvarı Ayarları (UFW)

```bash
# UFW durumunu kontrol et
sudo ufw status

# Eğer UFW aktifse, portları aç:
sudo ufw allow 3000/tcp comment 'ONUS Frontend'
sudo ufw allow 5001/tcp comment 'ONUS Backend API'

# Kuralları yeniden yükle
sudo ufw reload
```

---

### 8️⃣ Frontend'in Backend'e Bağlanması

Frontend kodunda API URL'ini güncellemelisiniz:

```bash
cd /var/www/onus-project/onus-frontend

# .env dosyası oluştur
nano .env.production
```

İçeriği:
```env
VITE_API_URL=http://178.208.187.213:5001
```

Sonra rebuild edin:
```bash
npm run build

# PM2'yi restart et
pm2 restart onus-frontend
```

---

## 🔧 Yönetim Komutları

### Frontend Yönetimi (PM2)
```bash
pm2 list                    # Tüm uygulamaları listele
pm2 logs onus-frontend      # Frontend loglarını görüntüle
pm2 restart onus-frontend   # Frontend'i yeniden başlat
pm2 stop onus-frontend      # Frontend'i durdur
pm2 delete onus-frontend    # Frontend'i PM2'den kaldır
```

### Backend Yönetimi (Systemd)
```bash
sudo systemctl status onus-api     # Durum kontrol
sudo systemctl restart onus-api    # Yeniden başlat
sudo systemctl stop onus-api       # Durdur
sudo systemctl start onus-api      # Başlat
sudo journalctl -u onus-api -f     # Canlı logları görüntüle
sudo journalctl -u onus-api --since "1 hour ago"  # Son 1 saatin logları
```

### Sunucu Yeniden Başlatıldığında Otomatik Başlat
```bash
# PM2 uygulamalarını kaydet
pm2 save

# PM2'yi startup'a ekle
pm2 startup
# Ekrana çıkan komutu çalıştırın

# Backend zaten systemd ile otomatik başlayacak
```

---

## 🌐 Nginx ile Reverse Proxy (Opsiyonel)

Eğer domain adı kullanmak veya 80 portunda yayınlamak isterseniz:

```bash
cd /var/www/onus-project
sudo nano setup-nginx.sh
```

`setup-nginx.sh` içinde değiştirin:
```bash
SERVER_NAME="onus.yourdomain.com"  # Domain adınız
FRONTEND_PORT=3000  # Frontend portunu eşleştir
BACKEND_PORT=5001   # Backend portunu eşleştir
```

Çalıştırın:
```bash
chmod +x setup-nginx.sh
sudo ./setup-nginx.sh
```

---

## 🔍 Sorun Giderme

### Frontend Çalışmıyor
```bash
# Port kullanımda mı?
sudo lsof -i :3000

# PM2 durumunu kontrol
pm2 describe onus-frontend

# Logları incele
pm2 logs onus-frontend --lines 100

# Yeniden deploy
cd /var/www/onus-project
PORT=3000 ./deploy-frontend.sh
```

### Backend Çalışmıyor
```bash
# Port kullanımda mı?
sudo lsof -i :5001

# Servis durumu
sudo systemctl status onus-api -l

# Detaylı loglar
sudo journalctl -u onus-api -n 100 --no-pager

# Yeniden deploy
cd /var/www/onus-project
sudo PORT=5001 ./deploy-api.sh
```

### CORS Hatası
Backend'de CORS ayarlarını kontrol edin:
```bash
sudo nano /var/www/onus-api/appsettings.json
```

`AllowedOrigins` içine frontend URL'ini ekleyin:
```json
"AllowedOrigins": "http://178.208.187.213:3000,http://localhost:3000"
```

Sonra restart:
```bash
sudo systemctl restart onus-api
```

---

## 📊 Test Checklist

- [ ] Frontend erişilebilir: http://178.208.187.213:3000
- [ ] Backend API çalışıyor: http://178.208.187.213:5001/api/projects
- [ ] Dil değiştirme çalışıyor (TR/EN/DE)
- [ ] Admin paneline giriş yapılabiliyor (admin/admin123)
- [ ] Projeler gösteriliyor
- [ ] İletişim formu çalışıyor
- [ ] Mevcut siteniz hala çalışıyor ✅

---

## 🔄 Güncelleme (Kod Değişikliği Sonrası)

```bash
# Sunucuda
cd /var/www/onus-project

# Yeni kodu çek
git pull origin main

# Frontend güncelle
cd onus-frontend
npm install
npm run build
pm2 restart onus-frontend

# Backend güncelle
cd ../Onus.API/Onus.API
dotnet publish -c Release -o /var/www/onus-api
sudo systemctl restart onus-api
```

---

## 📞 Hızlı Referans

**Frontend URL:** http://178.208.187.213:3000  
**Backend API:** http://178.208.187.213:5001  
**Admin Paneli:** http://178.208.187.213:3000/admin  
**Admin Kullanıcı:** admin / admin123

**Loglar:**
- Frontend: `pm2 logs onus-frontend`
- Backend: `sudo journalctl -u onus-api -f`

**Restart:**
- Frontend: `pm2 restart onus-frontend`
- Backend: `sudo systemctl restart onus-api`

---

## ⚡ Hızlı Başlangıç (Tüm Komutlar)

```bash
# 1. Bağlan
ssh root@178.208.187.213

# 2. Klonla
cd /var/www
sudo git clone https://github.com/alidnmz05/projec-onus.git onus-project
cd onus-project
sudo chown -R $USER:$USER .

# 3. Portları kontrol et
sudo netstat -tulpn | grep LISTEN

# 4. Frontend deploy (port 3000)
chmod +x deploy-frontend.sh
PORT=3000 ./deploy-frontend.sh

# 5. Backend deploy (port 5001)
chmod +x deploy-api.sh
sudo PORT=5001 ./deploy-api.sh

# 6. Güvenlik duvarı
sudo ufw allow 3000/tcp
sudo ufw allow 5001/tcp
sudo ufw reload

# 7. Test et
curl http://localhost:3000
curl http://localhost:5001/api/projects
```

---

**Başarılar! 🚀**

Herhangi bir sorun yaşarsanız, yukarıdaki sorun giderme bölümüne bakın veya logları kontrol edin.
