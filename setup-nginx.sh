#!/bin/bash

# ONUS Project - Nginx Konfigürasyon Script
# Ubuntu sunucuda çalıştırılacak

set -e

echo "🌐 ONUS Nginx Konfigürasyonu Oluşturuluyor..."

# Renk kodları
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Değişkenler - İhtiyacınıza göre düzenleyin
DOMAIN="your-domain.com"  # Domain adınızı buraya yazın
FRONTEND_PORT=8080
BACKEND_PORT=5000

echo -e "${YELLOW}🌍 Domain: $DOMAIN${NC}"
echo -e "${YELLOW}🔌 Frontend Port: $FRONTEND_PORT${NC}"
echo -e "${YELLOW}🔌 Backend Port: $BACKEND_PORT${NC}"

# Nginx konfigürasyon dosyası oluştur
sudo tee /etc/nginx/sites-available/onus > /dev/null << EOF
server {
    listen 80;
    server_name $DOMAIN www.$DOMAIN;

    # Güvenlik başlıkları
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Frontend - React App
    location / {
        proxy_pass http://localhost:$FRONTEND_PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # Timeout ayarları
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Backend API
    location /api/ {
        proxy_pass http://localhost:$BACKEND_PORT/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection keep-alive;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        
        # CORS başlıkları (gerekirse)
        add_header 'Access-Control-Allow-Origin' '*' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Content-Type, Authorization' always;
        
        # Timeout ayarları
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Statik dosyalar için cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        proxy_pass http://localhost:$FRONTEND_PORT;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types text/plain text/css text/xml text/javascript application/json application/javascript application/xml+rss application/rss+xml font/truetype font/opentype application/vnd.ms-fontobject image/svg+xml;

    # Error pages
    error_page 404 /404.html;
    error_page 500 502 503 504 /50x.html;
}
EOF

# Symlink oluştur
sudo ln -sf /etc/nginx/sites-available/onus /etc/nginx/sites-enabled/

# Default site'ı devre dışı bırak (isteğe bağlı)
sudo rm -f /etc/nginx/sites-enabled/default

# Nginx konfigürasyonunu test et
echo -e "${YELLOW}🔍 Nginx konfigürasyonu test ediliyor...${NC}"
sudo nginx -t

# Nginx'i yeniden başlat
echo -e "${YELLOW}🔄 Nginx yenileniyor...${NC}"
sudo systemctl restart nginx

echo -e "${GREEN}✅ Nginx konfigürasyonu tamamlandı!${NC}"
echo ""
echo "🌐 Site http://$DOMAIN adresinde yayında"
echo ""
echo "📝 SSL sertifikası için (Let's Encrypt):"
echo "sudo apt install certbot python3-certbot-nginx"
echo "sudo certbot --nginx -d $DOMAIN -d www.$DOMAIN"
