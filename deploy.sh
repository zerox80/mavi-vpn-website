#!/bin/bash
set -e

REPO_DIR="$HOME/mavi-vpn-website"
WEB_DIR="/var/www/mavi-vpn"

echo "🚀 Deploying Mavi VPN Website..."

echo "📥 Resetting, cleaning and pulling..."
cd "$REPO_DIR"
git reset --hard
git clean -fd
git pull

echo "📦 Installing dependencies..."
npm install --include=optional --legacy-peer-deps

echo "🔨 Building..."
npm run build

echo "🧹 Cleaning old deployment..."
sudo mkdir -p "$WEB_DIR"
sudo rm -rf "$WEB_DIR"/*

echo "📂 Copying new build..."
sudo cp -r "$REPO_DIR/dist/"* "$WEB_DIR/"

echo "✅ Deployment complete!"
