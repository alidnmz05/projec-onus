# PostgreSQL Migration Guide

## Overview
Bu döküman, ONUS API'nin InMemory database'den PostgreSQL'e geçişi için gerekli adımları içerir.

## 1. Ubuntu Sunucusunda PostgreSQL Kurulumu

### PostgreSQL Yükleme
```bash
# PostgreSQL ve ek araçları yükle
sudo apt update
sudo apt install postgresql postgresql-contrib -y

# PostgreSQL durumunu kontrol et
sudo systemctl status postgresql

# PostgreSQL'i başlat (gerekirse)
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Veritabanı ve Kullanıcı Oluşturma
```bash
# PostgreSQL kullanıcısına geç
sudo -u postgres psql

# PostgreSQL shell içinde aşağıdaki komutları çalıştır:
# 1. Veritabanı oluştur
CREATE DATABASE onusdb;

# 2. Kullanıcı oluştur (güçlü bir şifre kullan!)
CREATE USER onus_user WITH PASSWORD 'GÜÇLÜ_ŞİFRENİZİ_GİRİN';

# 3. Veritabanına tam yetki ver
GRANT ALL PRIVILEGES ON DATABASE onusdb TO onus_user;

# 4. Public schema'ya yetki ver (PostgreSQL 15+)
\c onusdb
GRANT ALL ON SCHEMA public TO onus_user;

# 5. Çıkış
\q
```

### PostgreSQL Bağlantı Ayarları
```bash
# pg_hba.conf dosyasını düzenle (local bağlantılar için)
sudo nano /etc/postgresql/*/main/pg_hba.conf

# Aşağıdaki satırı bulup düzenle:
# local   all             all                                     peer
# Şu şekilde değiştir:
# local   all             all                                     md5

# PostgreSQL'i yeniden başlat
sudo systemctl restart postgresql
```

### Bağlantıyı Test Et
```bash
# Yeni kullanıcıyla bağlan
psql -U onus_user -d onusdb -h localhost

# Şifrenizi girin, başarılı olursa çıkın:
\q
```

## 2. Connection String Yapılandırması

### Production Connection String
`Onus.API/appsettings.Production.json` dosyasını düzenleyin:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=onusdb;Username=onus_user;Password=GÜÇLÜ_ŞİFRENİZİ_GİRİN"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

**ÖNEMLİ:** Gerçek şifrenizi kullanın!

### Development Connection String (Opsiyonel)
Development'ta InMemory database kullanmaya devam etmek için `appsettings.json`'da connection string'i boş bırakın:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": ""
  }
}
```

## 3. Migration Uygulama

### Local'de Test (Opsiyonel)
```bash
# Önce local PostgreSQL kurulumunuzu test edin
cd Onus.API/Onus.API
dotnet ef database update
```

### Ubuntu Sunucusunda Production Migration
```bash
# 1. Sunucuya SSH ile bağlanın
ssh root@178.208.187.213

# 2. Proje dizinine gidin
cd /var/www/onus-api

# 3. appsettings.Production.json'u düzenleyin
nano appsettings.Production.json
# Connection string'e gerçek şifrenizi girin, kaydedin (Ctrl+O, Enter, Ctrl+X)

# 4. Migration'ı uygulayın
export ASPNETCORE_ENVIRONMENT=Production
dotnet ef database update --project Onus.API.csproj

# 5. Başarılı olursa API servisini yeniden başlatın
sudo systemctl restart onus-api
```

## 4. Deployment Script Güncellemeleri

`deploy-api.sh` scriptine migration desteği eklenmiştir. Script şimdi otomatik olarak:
1. Production environment'ı set eder
2. Database migration'ları uygular
3. API'yi yeniden başlatır

```bash
# Ubuntu'da deploy etmek için:
./deploy-api.sh
```

## 5. Doğrulama

### Database İçeriğini Kontrol Et
```bash
# PostgreSQL'e bağlan
sudo -u postgres psql -d onusdb

# Tabloları listele
\dt

# Örnek veriler yüklenmiş mi kontrol et
SELECT * FROM "References";
SELECT * FROM "Projects";
SELECT * FROM "BlogPosts";

# Çıkış
\q
```

### API Testleri
```bash
# References endpoint'ini test et
curl http://localhost:5001/api/references

# Yeni bir referans ekle
curl -X POST http://localhost:5001/api/references \
  -H "Content-Type: application/json" \
  -d '{
    "companyName": "Test Company",
    "industry": "Test",
    "year": 2024,
    "website": "https://test.com",
    "logoUrl": "https://via.placeholder.com/150"
  }'

# API'yi yeniden başlatıp veriyi kontrol et (persistence testi)
sudo systemctl restart onus-api
sleep 3
curl http://localhost:5001/api/references
# Eklediğiniz test verisi hala görünüyor olmalı!
```

## 6. Yedekleme ve Güvenlik

### Otomatik Yedekleme
```bash
# Yedekleme scripti oluştur
sudo nano /usr/local/bin/backup-onus-db.sh
```

İçeriği:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/onus"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

sudo -u postgres pg_dump onusdb > $BACKUP_DIR/onusdb_$TIMESTAMP.sql
gzip $BACKUP_DIR/onusdb_$TIMESTAMP.sql

# 7 günden eski yedekleri sil
find $BACKUP_DIR -name "onusdb_*.sql.gz" -mtime +7 -delete
```

```bash
# Çalıştırma izni ver
sudo chmod +x /usr/local/bin/backup-onus-db.sh

# Crontab ekle (her gün 03:00)
sudo crontab -e
# Ekle: 0 3 * * * /usr/local/bin/backup-onus-db.sh
```

### Güvenlik Önerileri
1. **Güçlü Şifre**: En az 16 karakter, büyük/küçük harf, rakam ve özel karakterler
2. **Firewall**: PostgreSQL portunu (5432) dışarıya kapatın
   ```bash
   sudo ufw deny 5432
   ```
3. **SSL**: Production'da SSL bağlantısı kullanın
4. **appsettings.Production.json**: Bu dosyayı Git'e commitlemeyin!
   ```bash
   echo "appsettings.Production.json" >> .gitignore
   ```

## 7. Sorun Giderme

### "Relation does not exist" hatası
```bash
# Migration'ların uygulandığını kontrol edin
dotnet ef migrations list

# Gerekirse migration'ı manuel uygulayın
dotnet ef database update --environment Production
```

### Bağlantı Hatası
```bash
# PostgreSQL çalışıyor mu?
sudo systemctl status postgresql

# Port dinleniyor mu?
sudo netstat -plnt | grep 5432

# Kullanıcı yetkileri doğru mu?
sudo -u postgres psql -d onusdb -c "\du"
```

### Şifre Hatası
```bash
# Kullanıcı şifresini sıfırla
sudo -u postgres psql
ALTER USER onus_user WITH PASSWORD 'YENİ_GÜÇLÜ_ŞİFRE';
\q

# appsettings.Production.json'u güncelleyin
```

## 8. Development vs Production

### Development (InMemory)
- `appsettings.json`: `"DefaultConnection": ""`
- Her restart'ta veriler sıfırlanır
- Hızlı test için idealdir
- Bağımlılık yok

### Production (PostgreSQL)
- `appsettings.Production.json`: Connection string dolu
- Veriler kalıcı
- Production-ready
- Yedekleme gerektirir

## Özet Komutlar

```bash
# Ubuntu PostgreSQL kurulumu
sudo apt install postgresql postgresql-contrib -y
sudo -u postgres psql -c "CREATE DATABASE onusdb;"
sudo -u postgres psql -c "CREATE USER onus_user WITH PASSWORD 'ŞİFRE';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE onusdb TO onus_user;"

# Migration uygulama
cd /var/www/onus-api
export ASPNETCORE_ENVIRONMENT=Production
dotnet ef database update

# API yeniden başlatma
sudo systemctl restart onus-api

# Doğrulama
curl http://localhost:5001/api/references
```

## Destek

Sorunlarla karşılaşırsanız:
1. PostgreSQL loglarını kontrol edin: `sudo tail -f /var/log/postgresql/postgresql-*-main.log`
2. API loglarını kontrol edin: `sudo journalctl -u onus-api -f`
3. Connection string'i doğrulayın
4. Firewall kurallarını kontrol edin: `sudo ufw status`
