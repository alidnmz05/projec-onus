# PostgreSQL Setup Guide - ONUS Project

## � Ubuntu Sunucuda PostgreSQL Kurulumu

### 1️⃣ PostgreSQL Yükle
```bash
# PostgreSQL repository ekle
sudo apt update
sudo apt install -y postgresql postgresql-contrib

# Servis başlat
sudo systemctl start postgresql
sudo systemctl enable postgresql

# Versiyon kontrol
psql --version
```

### 2️⃣ Database ve User Oluştur
```bash
# PostgreSQL kullanıcısına geç
sudo -u postgres psql

# SQL komutları (psql içinde)
CREATE DATABASE onus_db;
CREATE USER onus_user WITH ENCRYPTED PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE onus_db TO onus_user;

# PostgreSQL 15+ için ek izinler
\c onus_db
GRANT ALL ON SCHEMA public TO onus_user;
GRANT CREATE ON SCHEMA public TO onus_user;

# Çıkış
\q
```

### 3️⃣ Connection String Güncelle
Sunucuda `/var/www/onus-api/appsettings.json` düzenle:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=onus_db;Username=onus_user;Password=YOUR_SECURE_PASSWORD"
  }
}
```

**🔐 Güvenlik:** `your_secure_password` yerine güçlü şifre koy!

### 4️⃣ Migration ve Database Update
```bash
cd /var/www/onus-project/Onus.API/Onus.API

# Migration oluştur
dotnet ef migrations add InitialCreate

# Database'i güncelle (tablolar oluşturulur)
dotnet ef database update

# Kontrol et
sudo -u postgres psql -d onus_db -c "\dt"
```

### 5️⃣ Backend Yeniden Başlat
```bash
# Yeni publish
dotnet publish -c Release -o /var/www/onus-api

# Servis restart
sudo systemctl restart onus-api

# Durum kontrol
sudo systemctl status onus-api
```

---

## � PostgreSQL Yönetim Komutları

### Database Bağlantı
```bash
# PostgreSQL'e bağlan
sudo -u postgres psql

# Belirli database'e bağlan
sudo -u postgres psql -d onus_db

# User ile bağlan
psql -h localhost -U onus_user -d onus_db
```

### Yararlı SQL Komutları
```sql
-- Tüm database'leri listele
\l

-- Tablolari listele
\dt

-- Tablo yapısını gör
\d table_name

-- Kullanıcıları listele
\du

-- Database boyutu
SELECT pg_size_pretty(pg_database_size('onus_db'));

-- Tüm tabloları temizle
DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO onus_user;
```

### Backup ve Restore
```bash
# Backup al
pg_dump -h localhost -U onus_user onus_db > backup_$(date +%Y%m%d).sql

# Restore et
psql -h localhost -U onus_user onus_db < backup_20251208.sql
```

---

## � Sorun Giderme

### Bağlantı Hatası
```bash
# PostgreSQL çalışıyor mu?
sudo systemctl status postgresql

# Port dinliyor mu? (5432)
sudo netstat -tulpn | grep 5432

# Log kontrol
sudo tail -f /var/log/postgresql/postgresql-*.log
```

### Şifre Hatası
```bash
# Şifreyi değiştir
sudo -u postgres psql
ALTER USER onus_user WITH PASSWORD 'new_password';
```

### Yetki Hatası
```sql
-- Database sahibi yap
ALTER DATABASE onus_db OWNER TO onus_user;

-- Schema izinleri
GRANT ALL ON SCHEMA public TO onus_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO onus_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO onus_user;
```

---

## 📊 Development vs Production

### Local Development (Windows)
- **InMemory Database** kullanılır
- Veriler geçicidir (restart'ta silinir)
- Hızlı test için ideal

### Production (Ubuntu Sunucu)
- **PostgreSQL** kullanılır
- Veriler kalıcıdır
- Connection string gerekir

---

## � Migration Komutları

```bash
# Yeni migration oluştur
dotnet ef migrations add MigrationName

# Migration listesi
dotnet ef migrations list

# Son migration'ı geri al
dotnet ef migrations remove

# Database'i güncelle
dotnet ef database update

# Belirli migration'a geri dön
dotnet ef database update PreviousMigrationName

# Database'i sil
dotnet ef database drop
```

---

## 📝 appsettings.Production.json Örneği

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=onus_db;Username=onus_user;Password=StrongP@ssw0rd123;Port=5432;Pooling=true;SSL Mode=Prefer;"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Warning",
      "Microsoft.EntityFrameworkCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## ✅ Kontrol Listesi

- [ ] PostgreSQL kuruldu
- [ ] Database oluşturuldu (`onus_db`)
- [ ] User oluşturuldu (`onus_user`)
- [ ] İzinler verildi
- [ ] Connection string güncellendi
- [ ] Migration çalıştırıldı
- [ ] Tablolar oluştu
- [ ] Backend restart edildi
- [ ] API çalışıyor

---

**Notlar:**
- Development'ta InMemory kullanılır (hızlı test)
- Production'da PostgreSQL kullanılır (kalıcı veri)
- Şifreyi güvenli tutun!
- Düzenli backup alın!
