#!/bin/bash

# ONUS.COM.TR - Tam Deployment Script
# Bu script tüm deployment işlemlerini otomatik yapar

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   ONUS.COM.TR Full Deployment${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# 1. Backend Deployment
echo -e "${YELLOW}📦 1/3 Backend API Deploy Ediliyor...${NC}"
./deploy-backend.sh

echo ""
echo -e "${GREEN}✅ Backend deployment tamamlandı${NC}"
echo ""

# 2. Frontend Deployment
echo -e "${YELLOW}🎨 2/3 Frontend Deploy Ediliyor...${NC}"
./deploy-frontend.sh

echo ""
echo -e "${GREEN}✅ Frontend deployment tamamlandı${NC}"
echo ""

# 3. Nginx Reload
echo -e "${YELLOW}🔄 3/3 Nginx Yenileniyor...${NC}"
sudo nginx -t && sudo systemctl reload nginx

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   ✅ DEPLOYMENT TAMAMLANDI!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "${BLUE}🌐 Site: ${GREEN}https://onus.com.tr${NC}"
echo -e "${BLUE}📊 API: ${GREEN}https://onus.com.tr/api${NC}"
echo ""
echo -e "${YELLOW}📝 Servis Durumları:${NC}"
echo -e "Backend:  ${BLUE}sudo systemctl status onus-api${NC}"
echo -e "Frontend: ${BLUE}pm2 status${NC}"
echo -e "Nginx:    ${BLUE}sudo systemctl status nginx${NC}"
echo ""
