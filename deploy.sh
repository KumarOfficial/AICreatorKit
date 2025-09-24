#!/bin/bash

# Cloudflare Deployment Script for aiCreatorKit
# Usage: ./deploy.sh [staging|production]

set -e

ENVIRONMENT=${1:-staging}

echo "🚀 Deploying aiCreatorKit to Cloudflare ($ENVIRONMENT)..."

# Check if wrangler is installed
if ! command -v npx &> /dev/null; then
    echo "❌ npx is not installed. Please install Node.js first."
    exit 1
fi

# Build the application
echo "📦 Building application..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

echo "✅ Build completed successfully!"

# Deploy to Workers
echo "🔧 Deploying to Cloudflare Workers..."
if [ "$ENVIRONMENT" = "production" ]; then
    npx wrangler deploy --env production
else
    npx wrangler deploy --env staging
fi

if [ $? -ne 0 ]; then
    echo "❌ Workers deployment failed."
    exit 1
fi

echo "✅ Workers deployment completed!"

# Deploy to Pages
echo "📄 Deploying to Cloudflare Pages..."
if [ "$ENVIRONMENT" = "production" ]; then
    npx wrangler pages deploy build/client --project-name aicreatorkit-app
else
    npx wrangler pages deploy build/client --project-name aicreatorkit-app-staging
fi

if [ $? -ne 0 ]; then
    echo "❌ Pages deployment failed."
    exit 1
fi

echo "✅ Pages deployment completed!"

echo "🎉 Deployment to $ENVIRONMENT completed successfully!"
echo ""
echo "Next steps:"
echo "1. Check your Cloudflare dashboard for the deployment status"
echo "2. Test your application at the provided URLs"
echo "3. Set up custom domains if needed"
echo ""
echo "Useful commands:"
echo "- View logs: npx wrangler tail --env $ENVIRONMENT"
echo "- Local preview: npx wrangler dev --env $ENVIRONMENT"

