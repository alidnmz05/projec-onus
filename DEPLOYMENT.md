# ONUS Deployment Guide

## 🚀 Ubuntu Sunucuda Deployment Adımları

### 1️⃣ Sunucu Hazırlığı

```bash
# Sistem güncellemesi
sudo apt update && sudo apt upgrade -y

# Node.js 20.x kurulumu
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# .NET 8.0 SDK kurulumu
wget https://dot.net/v1/dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel 8.0
echo 'export DOTNET_ROOT=$HOME/.dotnet' >> ~/.bashrc
echo 'export PATH=$PATH:$DOTNET_ROOT:$DOTNET_ROOT/tools' >> ~/.bashrc
source ~/.bashrc

# PM2 kurulumu
sudo npm install -g pm2

# Nginx kurulumu
sudo apt install nginx -y

# Git kurulumu
sudo apt install git -y
```

### 2️⃣ Projeyi Klonlama

```bash
# Proje dizini oluştur
sudo mkdir -p /var/www
cd /var/www

# Projeyi klonla
sudo git clone https://github.com/alidnmz05/projec-onus.git onus
sudo chown -R $USER:$USER /var/www/onus
cd /var/www/onus
```

### 3️⃣ Frontend Deployment

```bash
# Deploy script'ini çalıştırılabilir yap
chmod +x deploy-frontend.sh

# Deploy
./deploy-frontend.sh
```

**Özel port kullanmak için** `deploy-frontend.sh` dosyasında `PORT=8080` değerini değiştirin.

### 4️⃣ Backend API Deployment

```bash
# Deploy script'ini çalıştırılabilir yap
chmod +x deploy-api.sh

# Deploy
./deploy-api.sh
```

**Özel port kullanmak için** `deploy-api.sh` dosyasında `PORT=5000` değerini değiştirin.

### 5️⃣ Nginx Konfigürasyonu

```bash
# Nginx setup script'ini çalıştırılabilir yap
chmod +x setup-nginx.sh

# setup-nginx.sh dosyasını düzenle
nano setup-nginx.sh
# DOMAIN="your-domain.com" satırını kendi domain'iniz ile değiştirin

# Nginx'i yapılandır
./setup-nginx.sh
```

### 6️⃣ Firewall Ayarları

```bash
# Portları aç
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8080/tcp  # Frontend port
sudo ufw allow 5000/tcp  # Backend port

# Firewall'u aktif et
sudo ufw enable
```

### 7️⃣ SSL Sertifikası (Opsiyonel)

```bash
# Certbot kurulumu
sudo apt install certbot python3-certbot-nginx -y

# SSL sertifikası al
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Otomatik yenileme için
sudo certbot renew --dry-run
```

## 🔧 Port Yapılandırması

### Frontend Port Değiştirme

**deploy-frontend.sh** dosyasında:
```bash
PORT=8080  # İstediğiniz portu yazın (örn: 3000, 8080, 9000)
```

### Backend Port Değiştirme

**deploy-api.sh** dosyasında:
```bash
PORT=5000  # İstediğiniz portu yazın (örn: 5000, 5001, 8000)
```

**setup-nginx.sh** dosyasında da aynı portları güncelleyin:
```bash
FRONTEND_PORT=8080
BACKEND_PORT=5000
```

## 📊 Yönetim Komutları

### Frontend (PM2)
```bash
pm2 status              # Durumu kontrol et
pm2 logs onus-frontend  # Logları göster
pm2 restart onus-frontend  # Yeniden başlat
pm2 stop onus-frontend  # Durdur
pm2 start onus-frontend # Başlat
```

### Backend (Systemd)
```bash
sudo systemctl status onus-api     # Durumu kontrol et
sudo journalctl -u onus-api -f     # Logları göster
sudo systemctl restart onus-api    # Yeniden başlat
sudo systemctl stop onus-api       # Durdur
sudo systemctl start onus-api      # Başlat
```

### Nginx
```bash
sudo nginx -t                      # Konfigürasyonu test et
sudo systemctl status nginx        # Durumu kontrol et
sudo systemctl restart nginx       # Yeniden başlat
sudo systemctl reload nginx        # Reload (kesintisiz)
```

## 🔄 Güncelleme (Yeni Kod Deploy)

```bash
cd /var/www/onus

# Son değişiklikleri çek
git pull origin main

# Frontend'i güncelle
cd onus-frontend
npm install
npm run build
pm2 restart onus-frontend

# Backend'i güncelle
cd ../Onus.API/Onus.API
dotnet publish -c Release -o /var/www/onus-api
sudo systemctl restart onus-api
```

## 🛠️ Sorun Giderme

### Frontend çalışmıyor
```bash
pm2 logs onus-frontend
# Port kullanımda mı kontrol et
sudo lsof -i :8080
```

### Backend çalışmıyor
```bash
sudo journalctl -u onus-api -f
# Port kullanımda mı kontrol et
sudo lsof -i :5000
```

### Nginx hatası
```bash
sudo nginx -t
sudo tail -f /var/log/nginx/error.log
```

### Port değiştirme sonrası
```bash
# PM2'yi yeniden başlat
pm2 delete onus-frontend
./deploy-frontend.sh

# Backend'i yeniden yapılandır
./deploy-api.sh

# Nginx'i güncelle
./setup-nginx.sh
```

## 📝 Önemli Notlar

1. **Port Seçimi**: Firewall'da açık olmalı, başka servis kullanmamalı
2. **Domain**: setup-nginx.sh'de domain adını güncelleyin
3. **SSL**: Production'da mutlaka SSL kullanın (Let's Encrypt ücretsiz)
4. **Güvenlik**: Admin şifresini değiştirin (AdminLogin.tsx)
5. **Database**: Production'da SQL Server kullanın (InMemory yerine)
6. **Backup**: Düzenli yedek alın

## 🔐 Güvenlik Tavsiyeleri

```bash
# Admin şifresini değiştir
nano onus-frontend/src/components/admin/AdminLogin.tsx

# Environment variables kullan
nano Onus.API/Onus.API/appsettings.Production.json

# Nginx rate limiting ekle
# /etc/nginx/sites-available/onus dosyasına ekle:
# limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
```

## 📞 Admin Panel Erişimi

- **URL**: `http://your-domain.com/admin`
- **Kullanıcı**: `admin`
- **Şifre**: `admin123` (değiştirin!)

## 🌍 Dil Desteği

Site otomatik olarak 3 dilde çalışır:
- 🇹🇷 Türkçe (varsayılan)
- 🇬🇧 İngilizce
- 🇩🇪 Almanca

Dil değiştirici sağ üst köşede bulunur.
