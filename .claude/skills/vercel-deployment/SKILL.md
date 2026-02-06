# Vercel Deployment — ClosetFitApp.com

## Purpose
Vercel deployment configuration, custom domain setup, preview deployments, and production optimization for the ClosetFitApp Astro site.

---

## Vercel Project Setup

### 1. Install Vercel CLI

```bash
npm install -g vercel
```

### 2. Link Project

```bash
cd closetfitapp-web
vercel link
```

### 3. Install Astro Vercel Adapter

```bash
npm install @astrojs/vercel
```

### 4. Configure Astro

```js
// astro.config.mjs
import vercel from '@astrojs/vercel';

export default defineConfig({
  output: 'static',
  adapter: vercel({
    webAnalytics: { enabled: true },
    speedInsights: { enabled: true },
  }),
});
```

---

## vercel.json Configuration

```json
{
  "framework": "astro",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" },
        { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
        { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" }
      ]
    },
    {
      "source": "/screenshots/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/fonts/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/_astro/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    },
    {
      "source": "/llms.txt",
      "headers": [
        { "key": "Content-Type", "value": "text/plain; charset=utf-8" },
        { "key": "Cache-Control", "value": "public, max-age=3600" }
      ]
    }
  ],
  "redirects": [
    { "source": "/home", "destination": "/", "permanent": true },
    { "source": "/blog/page/1", "destination": "/blog", "permanent": true }
  ],
  "rewrites": [
    {
      "source": "/.well-known/apple-app-site-association",
      "destination": "/apple-app-site-association"
    }
  ]
}
```

---

## Custom Domain Configuration

### 1. Add Domain in Vercel Dashboard

Vercel Dashboard → Project → Settings → Domains → Add `closetfitapp.com`

### 2. DNS Configuration

At your domain registrar, set:

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

### 3. SSL

Vercel automatically provisions and renews SSL certificates. No manual configuration needed.

### 4. WWW Redirect

Vercel automatically redirects `www.closetfitapp.com` → `closetfitapp.com` (or vice versa based on your preference set in the dashboard).

---

## Environment Variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

| Variable | Environment | Description |
|----------|-------------|-------------|
| `SANITY_PROJECT_ID` | Production, Preview, Development | Sanity project ID |
| `SANITY_DATASET` | Production, Preview, Development | Usually `production` |
| `SANITY_TOKEN` | Production, Preview, Development | Read-only API token |
| `SANITY_PREVIEW_TOKEN` | Preview, Development | Token with draft access |
| `KIT_API_KEY` | Production | ConvertKit API key |
| `SITE_URL` | Production | `https://closetfitapp.com` |
| `SITE_URL` | Preview | `https://preview.closetfitapp.com` |

**Rules:**
- Never commit `.env` files to Git
- Use separate tokens for production vs preview
- Rotate tokens periodically

---

## Preview Deployments

Every Git branch push and PR automatically gets a unique preview URL.

### How It Works

```
Push to branch "feature/hero-section"
  → Vercel builds preview at: closetfitapp-web-xxx.vercel.app
  → GitHub PR gets a comment with the preview link
  → Review the changes visually before merging
```

### Preview Benefits for Content
- Review auto-posted blog content before it goes to production
- Test animation changes on real devices via preview URL
- Share preview links with team for feedback

### Branch Protection

In Vercel Dashboard → Settings → Git:
- Production Branch: `main`
- Preview deployments: All other branches
- Enable "Deployment Protection" for preview URLs (optional: password/Vercel auth)

---

## Deploy Hooks (for CMS Webhooks)

### Create a Deploy Hook

Vercel Dashboard → Project → Settings → Git → Deploy Hooks:
- **Name**: `sanity-publish`
- **Branch**: `main`
- **URL generated**: `https://api.vercel.com/v1/integrations/deploy/prj_xxxx/yyyy`

### Connect to Sanity

In Sanity Dashboard → API → Webhooks:
- **URL**: The Vercel deploy hook URL
- **Trigger on**: Create, Update, Delete
- **Filter**: `_type == "post" && !(_id in path("drafts.**"))`

### Manual Trigger

```bash
# Trigger a rebuild manually
curl -X POST https://api.vercel.com/v1/integrations/deploy/prj_xxxx/yyyy
```

---

## Build Configuration

### Build Settings (Vercel Dashboard)

| Setting | Value |
|---------|-------|
| Framework Preset | Astro |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

### Build Scripts

```json
// package.json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check"
  }
}
```

---

## Vercel Analytics + Speed Insights

### Setup

Already configured in the Astro adapter:

```js
adapter: vercel({
  webAnalytics: { enabled: true },
  speedInsights: { enabled: true },
}),
```

This automatically injects the Vercel Analytics and Speed Insights scripts.

### What You Get

**Web Analytics** (free on all plans):
- Page views, unique visitors
- Top pages, referrers
- Country/region breakdown
- Device types

**Speed Insights** (free on all plans):
- Real User Monitoring (RUM)
- Core Web Vitals: LCP, INP, CLS
- Per-page performance scores
- Performance regression alerts

### Complementary Analytics Stack

| Tool | Purpose | Cost |
|------|---------|------|
| Vercel Analytics | Real-time traffic | Free |
| Vercel Speed Insights | Core Web Vitals RUM | Free |
| GA4 | Detailed behavior, conversions | Free |
| Plausible | Privacy-friendly, simple | ~$9/mo |
| Google Search Console | SEO performance, indexing | Free |

---

## Edge and Caching

### Static Asset Caching

Astro output in `_astro/` uses content-hashed filenames — cache immutably:

```json
{
  "source": "/_astro/(.*)",
  "headers": [
    { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
  ]
}
```

### HTML Caching

Vercel automatically serves static HTML from edge CDN. No manual configuration needed for SSG output.

### Cache Invalidation

When Vercel rebuilds (from Git push or deploy hook), the cache is automatically purged for updated pages.

---

## Performance Optimization

### What Vercel Handles Automatically
- **Brotli/Gzip compression** — all text assets
- **HTTP/2** — multiplexed requests
- **Edge CDN** — static assets served from nearest edge location
- **Image optimization** — via `next/image` (not used; we use Astro `<Image>` instead)
- **SSL/TLS** — auto-provisioned, auto-renewed

### What We Configure
- **Long cache headers** for static assets (screenshots, fonts, `_astro/`)
- **Security headers** (X-Frame-Options, CSP, etc.)
- **Redirects** for SEO (no duplicate content)

---

## Monitoring and Alerts

### Vercel Dashboard
- **Deployments**: Build logs, deployment status, rollback capability
- **Analytics**: Traffic and performance metrics
- **Logs**: Function logs (if using serverless functions)

### Recommended Alerts
- **Build failure**: Vercel sends email by default
- **Performance regression**: Speed Insights alerts when CWV degrades
- **Uptime monitoring**: Use external service (e.g., Better Uptime, Vercel's status page)

### Rollback

If a deployment breaks something:

```bash
# List recent deployments
vercel ls

# Instantly rollback to previous production deployment
vercel rollback
```

Or use the Vercel Dashboard → Deployments → click the three dots on a previous deployment → "Promote to Production".

---

## Deployment Checklist

### Pre-First-Deploy
- [ ] Vercel project created and linked to Git repo
- [ ] Custom domain `closetfitapp.com` configured with correct DNS
- [ ] SSL certificate provisioned (automatic)
- [ ] Environment variables set for all environments
- [ ] `vercel.json` committed with headers, redirects, rewrites

### Post-Deploy
- [ ] Homepage loads at `https://closetfitapp.com`
- [ ] `www.closetfitapp.com` redirects to `closetfitapp.com`
- [ ] Security headers present (check with securityheaders.com)
- [ ] `robots.txt` accessible at `/robots.txt`
- [ ] `llms.txt` accessible at `/llms.txt`
- [ ] `sitemap-index.xml` accessible
- [ ] Vercel Analytics showing data
- [ ] Speed Insights tracking Core Web Vitals
- [ ] Preview deployments working on PR branches

### Ongoing
- [ ] Deploy hook connected to Sanity (content publishes trigger rebuild)
- [ ] Build times under 2 minutes
- [ ] No deployment failures in the last 7 days
- [ ] Core Web Vitals passing in Speed Insights

---

## Quick Check

- [ ] `@astrojs/vercel` adapter configured with analytics + speed insights
- [ ] `vercel.json` has security headers, caching headers, and redirects
- [ ] Custom domain working with SSL
- [ ] Environment variables set (not committed to Git)
- [ ] Preview deployments active for all branches
- [ ] Deploy hook created for Sanity webhook
- [ ] Vercel Analytics and Speed Insights showing data
- [ ] Build succeeds with `npm run build`
- [ ] Rollback tested (know how to do it)
