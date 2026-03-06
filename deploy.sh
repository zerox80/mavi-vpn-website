#!/bin/bash
set -e

REPO_DIR="$HOME/mavi-vpn-website"
WEB_DIR="/var/www/mavi-vpn"

echo "🚀 Deploying Mavi VPN Website..."

# Pull latest changes
echo "📥 Resetting, cleaning and pulling..."
cd "$REPO_DIR"
git reset --hard
git clean -fd
git pull

# Install dependencies & build
echo "📦 Installing dependencies..."
npm ci --legacy-peer-deps

echo "🔨 Building..."
npm run build

# Deploy to web root
echo "🧹 Cleaning old deployment..."
sudo rm -rf "$WEB_DIR"/*

echo "📂 Copying new build..."
sudo cp -r "$REPO_DIR/dist" "$WEB_DIR/"

echo "✅ Deployment complete!"
