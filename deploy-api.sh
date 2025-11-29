#!/bin/bash

# ONUS Backend API Deployment Script
# Ubuntu sunucuda çalıştırılacak

set -e

echo "🚀 ONUS Backend API Deployment Başlıyor..."

# Renk kodları
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Değişkenler - İhtiyacınıza göre düzenleyin
PROJECT_DIR="/var/www/onus-project"
API_DIR="$PROJECT_DIR/Onus.API/Onus.API"
PUBLISH_DIR="/var/www/onus-api"
PORT=${PORT:-5001}  # Environment variable veya default 5001
SERVICE_NAME="onus-api"

echo -e "${YELLOW}📦 Proje dizini: $API_DIR${NC}"
echo -e "${YELLOW}📂 Publish dizini: $PUBLISH_DIR${NC}"
echo -e "${YELLOW}🔌 Port: $PORT${NC}"

# .NET SDK kontrolü
if ! command -v dotnet &> /dev/null; then
    echo -e "${RED}❌ .NET SDK bulunamadı. Lütfen .NET 8.0 SDK yükleyin.${NC}"
    echo "wget https://dot.net/v1/dotnet-install.sh"
    echo "chmod +x dotnet-install.sh"
    echo "./dotnet-install.sh --channel 8.0"
    exit 1
fi

echo -e "${GREEN}✅ .NET SDK $(dotnet --version)${NC}"

# API dizinine git
cd $API_DIR

# Restore packages
echo -e "${YELLOW}📦 Paketler yükleniyor...${NC}"
dotnet restore

# Build ve Publish
echo -e "${YELLOW}🏗️  Build oluşturuluyor...${NC}"
dotnet publish -c Release -o $PUBLISH_DIR

# appsettings.Production.json oluştur
echo -e "${YELLOW}⚙️  Production ayarları yapılandırılıyor...${NC}"
cat > $PUBLISH_DIR/appsettings.Production.json << EOF
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "Urls": "http://localhost:$PORT"
}
EOF

# Systemd service dosyası oluştur
echo -e "${YELLOW}🔧 Systemd servisi oluşturuluyor...${NC}"
sudo tee /etc/systemd/system/$SERVICE_NAME.service > /dev/null << EOF
[Unit]
Description=ONUS API Service
After=network.target

[Service]
WorkingDirectory=$PUBLISH_DIR
ExecStart=/usr/bin/dotnet $PUBLISH_DIR/Onus.API.dll
Restart=always
RestartSec=10
KillSignal=SIGINT
SyslogIdentifier=onus-api
User=$USER
Environment=ASPNETCORE_ENVIRONMENT=Production
Environment=ASPNETCORE_URLS=http://localhost:$PORT

[Install]
WantedBy=multi-user.target
EOF

# Servisi reload ve başlat
echo -e "${YELLOW}🔄 Servis yenileniyor...${NC}"
sudo systemctl daemon-reload
sudo systemctl enable $SERVICE_NAME
sudo systemctl restart $SERVICE_NAME

# Durum kontrolü
sleep 2
if systemctl is-active --quiet $SERVICE_NAME; then
    echo -e "${GREEN}✅ Backend API deployment tamamlandı!${NC}"
    echo -e "${GREEN}🌐 API http://178.208.187.213:$PORT adresinde çalışıyor${NC}"
    echo -e "${GREEN}   (Localhost: http://localhost:$PORT)${NC}"
else
    echo -e "${RED}❌ Servis başlatılamadı!${NC}"
    sudo systemctl status $SERVICE_NAME
    exit 1
fi

echo ""
echo "📊 Servis durumu:"
sudo systemctl status $SERVICE_NAME --no-pager
echo ""
echo "📝 Logları görmek için: sudo journalctl -u $SERVICE_NAME -f"
echo "🔄 Restart için: sudo systemctl restart $SERVICE_NAME"
echo "🛑 Durdurmak için: sudo systemctl stop $SERVICE_NAME"
