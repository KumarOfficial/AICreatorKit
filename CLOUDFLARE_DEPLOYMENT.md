# Cloudflare Workers + Pages Deployment Guide

This guide will help you deploy your aiCreatorKit app to Cloudflare Workers and Pages.

## Prerequisites

1. **Cloudflare Account**: Sign up at [cloudflare.com](https://cloudflare.com)
2. **Wrangler CLI**: Install globally or use the project dependency
3. **Node.js**: Version 18 or higher

## Setup Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Authenticate with Cloudflare

```bash
npx wrangler login
```

This will open a browser window to authenticate with your Cloudflare account.

### 3. Configure Environment Variables

Set your Supabase credentials as Cloudflare secrets:

```bash
# Set production secrets
npx wrangler secret put SUPABASE_URL
npx wrangler secret put SUPABASE_ANON_KEY
npx wrangler secret put SUPABASE_SERVICE_KEY

# Set staging secrets (optional)
npx wrangler secret put SUPABASE_URL --env staging
npx wrangler secret put SUPABASE_ANON_KEY --env staging
npx wrangler secret put SUPABASE_SERVICE_KEY --env staging
```

When prompted, enter your Supabase values:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_ANON_KEY`: Your Supabase anonymous key
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key

### 4. Update Configuration

Edit `wrangler.toml` and update:
- `name`: Your preferred worker name
- `destination_id`: Your Pages project ID (after creating it)
- KV namespace IDs (if using KV storage)

### 5. Build the Application

```bash
npm run build
```

## Deployment Options

### Option 1: Workers + Pages (Recommended)

This setup uses Cloudflare Workers for the API and Pages for static assets.

#### Deploy to Workers

```bash
# Deploy to production
npm run deploy:production

# Deploy to staging
npm run deploy:staging
```

#### Deploy to Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your Git repository or upload the `build/client` folder
4. Set build settings:
   - **Build command**: `npm run build`
   - **Build output directory**: `build/client`
   - **Root directory**: `/` (or your project root)

### Option 2: Pages Only (Simpler)

If you want to deploy everything to Pages:

```bash
npm run deploy:pages
```

### Option 3: Workers Only

If you want to serve everything from Workers:

```bash
npm run deploy:worker
```

## Custom Domain Setup

### 1. Add Custom Domain to Pages

1. Go to your Pages project in Cloudflare Dashboard
2. Navigate to **Custom domains**
3. Add your domain (e.g., `yourdomain.com`)
4. Follow the DNS setup instructions

### 2. Update Worker Routes (if using Workers)

1. Go to your Worker in Cloudflare Dashboard
2. Navigate to **Triggers** → **Routes**
3. Add routes for your custom domain:
   - `yourdomain.com/*`
   - `www.yourdomain.com/*`

### 3. Update Redirects

Edit `_redirects` file to handle your custom domain:

```
# Custom domain redirects
www.yourdomain.com/*    https://yourdomain.com/:splat    301
```

## Environment Management

### Production Environment

```bash
# Deploy to production
npm run deploy:production

# Set production secrets
npx wrangler secret put SUPABASE_URL --env production
npx wrangler secret put SUPABASE_ANON_KEY --env production
npx wrangler secret put SUPABASE_SERVICE_KEY --env production
```

### Staging Environment

```bash
# Deploy to staging
npm run deploy:staging

# Set staging secrets
npx wrangler secret put SUPABASE_URL --env staging
npx wrangler secret put SUPABASE_ANON_KEY --env staging
npx wrangler secret put SUPABASE_SERVICE_KEY --env staging
```

## Monitoring and Debugging

### View Logs

```bash
# View real-time logs
npx wrangler tail

# View logs for specific environment
npx wrangler tail --env staging
```

### Local Development

```bash
# Run locally with Wrangler
npm run preview

# Run Pages locally
npm run preview:pages
```

## Performance Optimization

### 1. Enable Caching

The `_headers` file is already configured for optimal caching:
- Static assets: 1 year cache
- Images: 1 month cache
- HTML: No cache

### 2. Enable Compression

Cloudflare automatically enables compression for text-based assets.

### 3. Use KV Storage (Optional)

For frequently accessed data, consider using Cloudflare KV:

```bash
# Create KV namespace
npx wrangler kv:namespace create "CACHE"

# Update wrangler.toml with the namespace ID
```

## Troubleshooting

### Common Issues

1. **Build Failures**: Check that all dependencies are installed and Node.js version is compatible
2. **Environment Variables**: Ensure all secrets are set correctly
3. **CORS Issues**: Check that your Supabase project allows your domain
4. **Routing Issues**: Verify `_redirects` file is properly configured

### Debug Commands

```bash
# Check configuration
npx wrangler whoami

# Validate configuration
npx wrangler dev --local

# View deployment status
npx wrangler deployments list
```

## Security Considerations

1. **Environment Variables**: Never commit secrets to version control
2. **CORS**: Configure Supabase to only allow your production domains
3. **Rate Limiting**: Consider implementing rate limiting for API endpoints
4. **HTTPS**: Cloudflare automatically provides HTTPS

## Cost Optimization

1. **Free Tier**: Cloudflare Workers and Pages have generous free tiers
2. **KV Storage**: Use sparingly as it has usage limits
3. **Bandwidth**: Monitor usage in Cloudflare Dashboard

## Support

- [Cloudflare Workers Documentation](https://developers.cloudflare.com/workers/)
- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Wrangler CLI Documentation](https://developers.cloudflare.com/workers/wrangler/)

