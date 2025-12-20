#!/bin/bash

# ONUS Domain ve SSL Kurulum Script
# Domain: onus.com.tr

set -e

echo "🌐 ONUS Domain ve SSL Kurulumu Başlıyor..."

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

DOMAIN="onus.com.tr"
WWW_DOMAIN="www.onus.com.tr"
EMAIL="info@onus.com.tr"  # SSL sertifikası için email

echo -e "${YELLOW}📝 Domain: $DOMAIN${NC}"
echo -e "${YELLOW}📧 Email: $EMAIL${NC}"

# Nginx konfigürasyonunu oluştur
echo -e "${YELLOW}⚙️  Nginx konfigürasyonu oluşturuluyor...${NC}"

sudo tee /etc/nginx/sites-available/onus.com.tr > /dev/null << 'EOF'
# ONUS Frontend - HTTP (SSL kurulumundan önce)
server {
    listen 80;
    listen [::]:80;
    server_name onus.com.tr www.onus.com.tr;

    # Let's Encrypt ACME challenge için
    location /.well-known/acme-challenge/ {
        root /var/www/html;
    }

    # Frontend
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

# ONUS API
server {
    listen 80;
    listen [::]:80;
    server_name api.onus.com.tr;

    location / {
        proxy_pass http://localhost:5001;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # CORS headers
        add_header Access-Control-Allow-Origin *;
        add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
        add_header Access-Control-Allow-Headers 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range,Authorization';
        
        if ($request_method = 'OPTIONS') {
            return 204;
        }
    }
}
EOF

# Symlink oluştur
echo -e "${YELLOW}🔗 Nginx site aktif ediliyor...${NC}"
sudo ln -sf /etc/nginx/sites-available/onus.com.tr /etc/nginx/sites-enabled/

# Eski default konfigürasyonu kaldır
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx test et
echo -e "${YELLOW}🧪 Nginx konfigürasyonu test ediliyor...${NC}"
sudo nginx -t

# Nginx'i yeniden başlat
echo -e "${YELLOW}🔄 Nginx yeniden başlatılıyor...${NC}"
sudo systemctl reload nginx

echo ""
echo -e "${GREEN}✅ Nginx konfigürasyonu tamamlandı!${NC}"
echo ""
echo "📋 DNS Kayıtlarını Kontrol Edin:"
echo "   A Record: onus.com.tr -> 178.208.187.213"
echo "   A Record: www.onus.com.tr -> 178.208.187.213"
echo "   A Record: api.onus.com.tr -> 178.208.187.213"
echo ""
echo "🌐 Test Adresleri:"
echo "   http://onus.com.tr"
echo "   http://www.onus.com.tr"
echo "   http://api.onus.com.tr"
echo ""
echo -e "${YELLOW}⏳ DNS yayılmasını bekleyin (5-10 dakika)${NC}"
echo ""

# Certbot kurulu mu kontrol et
if ! command -v certbot &> /dev/null; then
    echo -e "${YELLOW}📦 Certbot kuruluyor...${NC}"
    sudo apt update
    sudo apt install certbot python3-certbot-nginx -y
fi

echo ""
echo -e "${GREEN}🔒 SSL Kurulumu İçin Şu Komutu Çalıştırın:${NC}"
echo ""
echo "sudo certbot --nginx -d onus.com.tr -d www.onus.com.tr -d api.onus.com.tr --email $EMAIL --agree-tos --non-interactive --redirect"
echo ""
echo -e "${YELLOW}Not: Bu komutu DNS yayılması tamamlandıktan sonra çalıştırın!${NC}"
echo ""

# SSL kurulum script'i oluştur
cat > /tmp/install-ssl.sh << 'SSLEOF'
#!/bin/bash

echo "🔒 SSL Sertifikası alınıyor..."

# Let's Encrypt SSL sertifikası al
sudo certbot --nginx \
    -d onus.com.tr \
    -d www.onus.com.tr \
    -d api.onus.com.tr \
    --email info@onus.com.tr \
    --agree-tos \
    --non-interactive \
    --redirect

# Otomatik yenileme testi
echo "🔄 SSL otomatik yenileme test ediliyor..."
sudo certbot renew --dry-run

echo ""
echo "✅ SSL Kurulumu Tamamlandı!"
echo ""
echo "🌐 HTTPS Test Adresleri:"
echo "   https://onus.com.tr"
echo "   https://www.onus.com.tr"
echo "   https://api.onus.com.tr"
echo ""
echo "📝 Sertifika otomatik olarak 90 günde bir yenilenecek."
echo ""

SSLEOF

chmod +x /tmp/install-ssl.sh

echo -e "${GREEN}✅ Kurulum tamamlandı!${NC}"
echo ""
echo "📌 Sonraki Adımlar:"
echo "   1. DNS kayıtlarının yayılmasını bekleyin (dig onus.com.tr ile kontrol edin)"
echo "   2. SSL kurulumu için: bash /tmp/install-ssl.sh"
echo ""
