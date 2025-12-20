#!/bin/bash

#########################################
# ONUS Frontend Deployment Script
# Özel Port Desteği ile PM2 Deployment
#########################################

set -e  # Hata durumunda dur

# Renkli output için
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Başlık
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   ONUS Frontend Deployment Script${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Port yapılandırması (environment variable veya default)
FRONTEND_PORT=${PORT:-3000}
APP_NAME="onus-frontend"
PROJECT_DIR="/var/www/onus-project/onus-frontend"

echo -e "${YELLOW}Yapılandırma:${NC}"
echo -e "  Port: ${GREEN}${FRONTEND_PORT}${NC}"
echo -e "  Uygulama: ${GREEN}${APP_NAME}${NC}"
echo -e "  Dizin: ${GREEN}${PROJECT_DIR}${NC}"
echo ""

# Node.js kontrolü
echo -e "${YELLOW}Node.js kontrol ediliyor...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js bulunamadı!${NC}"
    echo -e "${YELLOW}Lütfen Node.js yükleyin:${NC}"
    echo "  curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
    echo "  sudo apt-get install -y nodejs"
    exit 1
fi
echo -e "${GREEN}✓ Node.js bulundu: $(node --version)${NC}"

# npm kontrolü
echo -e "${YELLOW}npm kontrol ediliyor...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm bulunamadı!${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm bulundu: $(npm --version)${NC}"

# PM2 kontrolü ve kurulum
echo -e "${YELLOW}PM2 kontrol ediliyor...${NC}"
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}PM2 bulunamadı, yükleniyor...${NC}"
    sudo npm install -g pm2
    echo -e "${GREEN}✓ PM2 yüklendi${NC}"
else
    echo -e "${GREEN}✓ PM2 bulundu: $(pm2 --version)${NC}"
fi

# Proje dizinine git
echo -e "${YELLOW}Proje dizinine gidiliyor...${NC}"
if [ ! -d "$PROJECT_DIR" ]; then
    # Eğer tam path yoksa, mevcut dizinden devam et
    if [ -d "onus-frontend" ]; then
        PROJECT_DIR="$(pwd)/onus-frontend"
    else
        echo -e "${RED}❌ Frontend dizini bulunamadı: $PROJECT_DIR${NC}"
        exit 1
    fi
fi
cd "$PROJECT_DIR"
echo -e "${GREEN}✓ Dizin: $(pwd)${NC}"

# Dependencies yükle
echo -e "${YELLOW}Bağımlılıklar yükleniyor...${NC}"
npm install
echo -e "${GREEN}✓ Bağımlılıklar yüklendi${NC}"

# Production build
echo -e "${YELLOW}Production build oluşturuluyor...${NC}"
npm run build
echo -e "${GREEN}✓ Build tamamlandı${NC}"

# Port için .env dosyası oluştur
echo -e "${YELLOW}.env dosyası oluşturuluyor...${NC}"
cat > .env.production << EOF
PORT=${FRONTEND_PORT}
VITE_API_URL=https://onus.com.tr/api
EOF
echo -e "${GREEN}✓ .env.production oluşturuldu${NC}"

# PM2'de çalışan uygulamayı kontrol et
echo -e "${YELLOW}PM2 uygulaması kontrol ediliyor...${NC}"
if pm2 describe $APP_NAME &> /dev/null; then
    echo -e "${YELLOW}Mevcut uygulama bulundu, yeniden başlatılıyor...${NC}"
    pm2 delete $APP_NAME
fi

# PM2 ile başlat
echo -e "${YELLOW}PM2 ile uygulama başlatılıyor...${NC}"
pm2 start npm --name "$APP_NAME" -- run preview -- --port $FRONTEND_PORT --host 0.0.0.0

# PM2'yi kaydet
echo -e "${YELLOW}PM2 yapılandırması kaydediliyor...${NC}"
pm2 save

# PM2 startup
echo -e "${YELLOW}PM2 startup yapılandırması...${NC}"
pm2 startup || true

# Durum kontrolü
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   ✓ Frontend Deployment Tamamlandı!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}Uygulama Bilgileri:${NC}"
echo -e "  URL: ${GREEN}http://178.208.187.213:${FRONTEND_PORT}${NC}"
echo -e "  Uygulama: ${GREEN}${APP_NAME}${NC}"
echo -e "  Durum: ${GREEN}$(pm2 describe $APP_NAME | grep 'status' | head -1 || echo 'Çalışıyor')${NC}"
echo ""
echo -e "${BLUE}Yönetim Komutları:${NC}"
echo -e "  pm2 list                  - Uygulamaları listele"
echo -e "  pm2 logs $APP_NAME        - Logları görüntüle"
echo -e "  pm2 restart $APP_NAME     - Yeniden başlat"
echo -e "  pm2 stop $APP_NAME        - Durdur"
echo -e "  pm2 delete $APP_NAME      - Kaldır"
echo ""
echo -e "${YELLOW}Not: Güvenlik duvarınızda ${FRONTEND_PORT} portunu açmayı unutmayın:${NC}"
echo -e "  sudo ufw allow ${FRONTEND_PORT}/tcp"
echo ""
