# Domain ve SSL Kurulum Rehberi

## 🌐 Domain: onus.com.tr

### 1. DNS Kayıtları (Domain Yönetim Panelinde)

Aşağıdaki DNS kayıtlarını domain yönetim panelinizde oluşturun:

```
Type    Name    Value               TTL
A       @       178.208.187.213     3600
A       www     178.208.187.213     3600
A       api     178.208.187.213     3600
```

**Açıklama:**
- `@` (root domain): onus.com.tr
- `www`: www.onus.com.tr
- `api`: api.onus.com.tr (Backend API için)

### 2. DNS Yayılmasını Kontrol Etme

DNS kayıtlarının yayılıp yayılmadığını kontrol edin:

```bash
# Linux/Mac
dig onus.com.tr
dig www.onus.com.tr
dig api.onus.com.tr

# Windows PowerShell
nslookup onus.com.tr
nslookup www.onus.com.tr
nslookup api.onus.com.tr

# Online araç
# https://dnschecker.org/
```

DNS yayılması genellikle 5-10 dakika sürer, ancak 24-48 saat kadar uzayabilir.

### 3. Ubuntu Sunucuda Kurulum

#### Adım 1: Sunucuya bağlanın
```bash
ssh root@178.208.187.213
```

#### Adım 2: Proje dizinine gidin
```bash
cd /var/www/onus-project
git pull origin main
```

#### Adım 3: Domain ve Nginx kurulumunu yapın
```bash
chmod +x setup-domain-ssl.sh
./setup-domain-ssl.sh
```

Bu script:
- ✅ Nginx konfigürasyonunu oluşturur
- ✅ HTTP (port 80) üzerinden site erişilebilir hale gelir
- ✅ Certbot kurulumu yapar
- ✅ SSL kurulum script'i hazırlar

#### Adım 4: DNS yayılmasını bekleyin
```bash
# DNS kontrolü
dig onus.com.tr

# Beklenen çıktı:
# onus.com.tr.  3600  IN  A  178.208.187.213
```

#### Adım 5: HTTP üzerinden test edin
```bash
curl -I http://onus.com.tr
curl -I http://www.onus.com.tr
curl -I http://api.onus.com.tr/api/settings
```

#### Adım 6: SSL Sertifikası alın
```bash
bash /tmp/install-ssl.sh
```

Bu script:
- ✅ Let's Encrypt'ten ücretsiz SSL sertifikası alır
- ✅ Otomatik HTTP → HTTPS yönlendirmesi yapar
- ✅ 90 günde bir otomatik yenileme ayarlar

### 4. Frontend Environment Güncelleme

SSL kurulumundan sonra frontend'deki API URL'ini güncelleyin:

#### Local Development (`.env.development`)
```env
VITE_API_URL=http://localhost:5177/api
```

#### Production (`.env.production`)
```env
VITE_API_URL=https://api.onus.com.tr/api
```

### 5. Backend CORS Güncelleme

`Onus.API/Onus.API/Program.cs` dosyasında CORS ayarlarını güncelleyin:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        builder => builder
            .WithOrigins(
                "http://localhost:3000",
                "http://localhost:3001",
                "https://onus.com.tr",
                "https://www.onus.com.tr",
                "http://178.208.187.213:3000"
            )
            .AllowAnyMethod()
            .AllowAnyHeader()
            .AllowCredentials());
});
```

### 6. Yeniden Deploy

```bash
# Backend
cd /var/www/onus-project
./deploy-api.sh

# Frontend
./deploy-frontend.sh
```

### 7. Final Nginx Konfigürasyonu (SSL Sonrası)

SSL kurulumu tamamlandıktan sonra Nginx otomatik olarak güncellenecek:

```nginx
# HTTPS - Frontend
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name onus.com.tr www.onus.com.tr;

    ssl_certificate /etc/letsencrypt/live/onus.com.tr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/onus.com.tr/privkey.pem;
    
    # SSL Security Headers
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# HTTPS - API
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name api.onus.com.tr;

    ssl_certificate /etc/letsencrypt/live/onus.com.tr/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/onus.com.tr/privkey.pem;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}

# HTTP → HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name onus.com.tr www.onus.com.tr api.onus.com.tr;
    return 301 https://$server_name$request_uri;
}
```

## 🎯 Test ve Doğrulama

### SSL Test
```bash
# SSL Labs - A+ rating için
https://www.ssllabs.com/ssltest/analyze.html?d=onus.com.tr

# Manual test
curl -I https://onus.com.tr
curl -I https://api.onus.com.tr/api/settings
```

### Site Erişimi
- **Ana Sayfa:** https://onus.com.tr
- **Admin Panel:** https://onus.com.tr/admin
- **API Swagger:** https://api.onus.com.tr/swagger

### HTTP → HTTPS Yönlendirme
```bash
curl -I http://onus.com.tr
# Beklenen: 301 Moved Permanently → https://onus.com.tr
```

## 🔄 SSL Otomatik Yenileme

Certbot otomatik olarak bir systemd timer oluşturur:

```bash
# Timer durumunu kontrol et
sudo systemctl status certbot.timer

# Manuel yenileme testi
sudo certbot renew --dry-run

# Gerçek yenileme (gerekirse)
sudo certbot renew
```

## 🔒 Güvenlik İpuçları

### 1. Firewall Ayarları
```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 22/tcp
sudo ufw enable
```

### 2. Nginx Rate Limiting
```nginx
http {
    limit_req_zone $binary_remote_addr zone=one:10m rate=10r/s;
    
    server {
        location /api/ {
            limit_req zone=one burst=20;
        }
    }
}
```

### 3. Fail2ban (Opsiyonel)
```bash
sudo apt install fail2ban
sudo systemctl enable fail2ban
```

## 📊 Monitoring

### Nginx Access Logs
```bash
sudo tail -f /var/log/nginx/access.log
```

### SSL Sertifika Durumu
```bash
sudo certbot certificates
```

### Site Uptime Monitoring
- UptimeRobot: https://uptimerobot.com/
- Pingdom: https://www.pingdom.com/

## 🆘 Sorun Giderme

### DNS yayılmadı
```bash
# DNS cache temizle (local)
sudo systemd-resolve --flush-caches

# DNS server değiştir (sunucuda)
echo "nameserver 8.8.8.8" | sudo tee /etc/resolv.conf
```

### SSL sertifikası alınamıyor
```bash
# Port 80'in açık olduğunu doğrulayın
sudo netstat -tlnp | grep :80

# Firewall kontrolü
sudo ufw status

# Nginx loglarını kontrol edin
sudo tail -f /var/log/nginx/error.log
```

### CORS hataları
- Backend'de domain'leri CORS whitelist'e ekleyin
- Frontend .env.production dosyasında API URL'i kontrol edin
- Browser Developer Console'da detaylı hata mesajını kontrol edin

## 📝 Checklist

- [ ] DNS kayıtları oluşturuldu (A records)
- [ ] DNS yayılması tamamlandı
- [ ] Nginx konfigürasyonu uygulandı
- [ ] HTTP üzerinden site erişilebilir
- [ ] SSL sertifikası alındı
- [ ] HTTPS üzerinden site erişilebilir
- [ ] HTTP → HTTPS yönlendirme çalışıyor
- [ ] Frontend .env.production güncellendi
- [ ] Backend CORS ayarları güncellendi
- [ ] Admin panel erişilebilir
- [ ] API endpoints çalışıyor
- [ ] SSL otomatik yenileme test edildi

## 🎉 Tamamlandı!

Site artık https://onus.com.tr adresinde yayında!

**Erişim Adresleri:**
- 🌐 Ana Site: https://onus.com.tr
- 🔐 Admin Panel: https://onus.com.tr/admin
- 📡 API: https://api.onus.com.tr
- 📚 API Docs: https://api.onus.com.tr/swagger
