# Deployment Guide — VKPrecision Valuation & Advisory

Complete build and deployment instructions for the VKPrecision website.

---

## Table of Contents

1. [Prerequisites](#1-prerequisites)
2. [Local Development](#2-local-development)
3. [Production Build](#3-production-build)
4. [Deployment Options](#4-deployment-options)
   - [Option A — Vercel (recommended)](#option-a--vercel-recommended)
   - [Option B — Netlify](#option-b--netlify)
   - [Option C — Cloudflare Pages](#option-c--cloudflare-pages)
   - [Option D — GitHub Pages](#option-d--github-pages)
   - [Option E — Any static host (S3, Nginx, Apache, FTP)](#option-e--any-static-host-s3-nginx-apache-ftp)
   - [Option F — Docker container](#option-f--docker-container)
5. [Custom Domain](#5-custom-domain)
6. [Environment Variables](#6-environment-variables)
7. [Performance & SEO Checklist](#7-performance--seo-checklist)
8. [Troubleshooting](#8-troubleshooting)
9. [Post-Deployment](#9-post-deployment)

---

## 1. Prerequisites

| Tool | Version | Check command |
|------|---------|---------------|
| Node.js | 18.x or 20.x (LTS) | `node -v` |
| npm | 9+ (bundled with Node) | `npm -v` |
| Git | any recent | `git --version` |

Download Node.js: <https://nodejs.org/en/download>

---

## 2. Local Development

```powershell
# from the project root
cd "c:\Users\Satish.Shewale\OneDrive - ENCORA\outward\website"

# install dependencies (first time only)
npm install

# start dev server with hot reload
npm run dev
```

The site opens automatically at <http://localhost:5173>.

### Available scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Vite dev server with HMR on port 5173 |
| `npm run build` | TypeScript check + production build to `dist/` |
| `npm run preview` | Serves the built `dist/` locally for verification |
| `npm run typecheck` | Type-checks without emitting files |

---

## 3. Production Build

```powershell
npm run build
```

This runs `tsc -b && vite build` and produces optimised static assets in the `dist/` folder:

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js
│   ├── index-[hash].css
│   └── ...
└── favicon.svg
```

### Verify the build locally

```powershell
npm run preview
```

Opens at <http://localhost:4173>. Test every section, navigation, and the contact form before deploying.

---

## 4. Deployment Options

### Option A — Vercel (recommended)

Zero-config, fastest path for Vite + React.

**Via dashboard:**

1. Push code to GitHub / GitLab / Bitbucket.
2. Go to <https://vercel.com/new> and import the repo.
3. Vercel auto-detects Vite. Confirm:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
4. Click **Deploy**.

**Via CLI:**

```powershell
npm i -g vercel
vercel             # first deploy (preview)
vercel --prod      # production deploy
```

---

### Option B — Netlify

**Via dashboard:**

1. Push code to a Git provider.
2. Go to <https://app.netlify.com/start>, pick the repo.
3. Set:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
4. Click **Deploy**.

**Via CLI:**

```powershell
npm i -g netlify-cli
netlify deploy --build              # preview
netlify deploy --build --prod       # production
```

**SPA fallback (optional)** — single-page app, currently all anchor-based, so not strictly required. If you later add client-side routing, create `public/_redirects`:

```
/*    /index.html   200
```

---

### Option C — Cloudflare Pages

1. Push to GitHub / GitLab.
2. Go to <https://dash.cloudflare.com/> → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Settings:
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. **Save and Deploy**.

---

### Option D — GitHub Pages

GitHub Pages serves from a sub-path like `https://<user>.github.io/<repo>`. Update `vite.config.ts` with the repo name as the base:

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/vkprecision-website/',   // <-- repo name
});
```

Then:

```powershell
# install the helper once
npm i -D gh-pages
```

Add to `package.json` scripts:

```json
"deploy": "npm run build && gh-pages -d dist"
```

Deploy:

```powershell
npm run deploy
```

In the repo settings, **Pages → Source: Deploy from branch → `gh-pages` / root**.

---

### Option E — Any static host (S3, Nginx, Apache, FTP)

The `dist/` folder is plain HTML / CSS / JS. Upload its **contents** (not the folder itself) to your web root.

**Nginx server block:**

```nginx
server {
    listen 80;
    server_name vkptech.in www.vkptech.in;
    root /var/www/vkprecision/dist;
    index index.html;

    # cache hashed assets aggressively
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback (safe even for anchor-only navigation)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # gzip
    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

**Apache `.htaccess`** (place in web root):

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>

<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
</IfModule>
```

**AWS S3 + CloudFront:**

```powershell
# build
npm run build

# upload (requires AWS CLI configured)
aws s3 sync dist/ s3://<your-bucket>/ --delete

# invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id <DIST_ID> --paths "/*"
```

Set the S3 bucket's static website hosting **Index document** to `index.html`.

---

### Option F — Docker container

Create `Dockerfile` at the project root:

```dockerfile
# --- Build stage ---
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# --- Serve stage ---
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Create `nginx.conf`:

```nginx
server {
    listen 80;
    root /usr/share/nginx/html;
    index index.html;

    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    location / {
        try_files $uri $uri/ /index.html;
    }

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;
}
```

Build and run:

```powershell
docker build -t vkprecision-web .
docker run -d -p 8080:80 --name vkprecision vkprecision-web
```

Open <http://localhost:8080>.

---

## 5. Custom Domain

Point `vkptech.in` (or your domain) at the host:

| Host | DNS records |
|------|-------------|
| Vercel | `A` → `76.76.21.21` and `CNAME www` → `cname.vercel-dns.com` |
| Netlify | `CNAME` → `<site>.netlify.app` (and ALIAS/ANAME for apex) |
| Cloudflare Pages | Add custom domain in dashboard; CF handles DNS automatically |
| S3 + CloudFront | `ALIAS` / `CNAME` → CloudFront distribution domain |

Always enable **HTTPS / SSL** (free with Vercel, Netlify, CF, or via Let's Encrypt for self-hosted).

---

## 6. Environment Variables

Currently the site has no runtime env vars. When you wire the contact form to a backend, prefix variables with `VITE_` so Vite exposes them to the client:

```env
# .env.local  (never commit this file)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/xxxxxxxx
VITE_EMAILJS_PUBLIC_KEY=...
VITE_EMAILJS_SERVICE_ID=...
VITE_EMAILJS_TEMPLATE_ID=...
```

Use in code:

```ts
const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
```

Configure the same variables in your host's dashboard (Vercel/Netlify/Cloudflare → Settings → Environment Variables).

---

## 7. Performance & SEO Checklist

Before going live:

- [ ] `npm run build` finishes with no TS errors.
- [ ] `npm run preview` — every section renders, no console errors.
- [ ] Test mobile breakpoints: 360px, 414px, 768px, 1024px, 1440px.
- [ ] Lighthouse audit (Chrome DevTools → Lighthouse) → aim for 90+ on Performance, Accessibility, Best Practices, SEO.
- [ ] Add real social links in [src/components/Footer.tsx](src/components/Footer.tsx) (currently `href="#"`).
- [ ] Wire the contact form in [src/components/Contact.tsx](src/components/Contact.tsx) to a backend / form service.
- [ ] Update `<meta name="description">` in [index.html](index.html) if business copy changes.
- [ ] Add Open Graph / Twitter card tags in [index.html](index.html) for link previews:
  ```html
  <meta property="og:title" content="VKPrecision Valuation & Advisory" />
  <meta property="og:description" content="Accurate, transparent valuation services across India." />
  <meta property="og:image" content="https://vkptech.in/og-image.jpg" />
  <meta property="og:url" content="https://vkptech.in" />
  <meta name="twitter:card" content="summary_large_image" />
  ```
- [ ] Submit sitemap to Google Search Console once domain is live.
- [ ] Add Google Analytics / Plausible / Umami snippet to [index.html](index.html) if tracking is needed.

---

## 8. Troubleshooting

**`npm install` fails on Windows with permission errors**
Run PowerShell as Administrator, or `npm cache clean --force` then retry.

**Build fails — `tsc` errors**
Run `npm run typecheck` to see exact TS errors. The build script is `tsc -b && vite build` — both must pass.

**Blank page after deployment**
Usually wrong `base` path. If deploying to a sub-path (e.g. GitHub Pages), set `base: '/repo-name/'` in [vite.config.ts](vite.config.ts) and rebuild.

**Fonts not loading**
Verify Google Fonts `<link>` in [index.html](index.html) isn't blocked by CSP / firewall. For offline / strict-CSP environments, self-host Poppins + Inter and update the `<link>`.

**Smooth scroll not working on Safari**
Safari supports `scroll-behavior: smooth` since v15.4. Older versions degrade gracefully to instant jumps.

**Contact form does nothing**
By design — `handleSubmit` in [Contact.tsx](src/components/Contact.tsx) is currently client-side only. Wire it to a service (Formspree, EmailJS, or a serverless endpoint) before launch.

**Port 5173 already in use**
```powershell
# kill the process, or change the port in vite.config.ts:
server: { port: 3000 }
```

---

## 9. Post-Deployment

After the site is live:

1. **Verify HTTPS** — should redirect HTTP → HTTPS automatically on Vercel/Netlify/CF.
2. **Test on real devices** — at minimum: iPhone Safari, Android Chrome, desktop Chrome, Firefox, Edge.
3. **Set up uptime monitoring** — UptimeRobot (free) or BetterStack.
4. **Configure analytics** if needed (GA4, Plausible).
5. **Submit to Google Search Console** — verify ownership and submit sitemap.
6. **Backup the repo** — push to GitHub/GitLab if not already done.

---

## Quick Reference

```powershell
# develop
npm install
npm run dev

# build & verify
npm run build
npm run preview

# deploy (pick one)
vercel --prod                    # Vercel
netlify deploy --build --prod    # Netlify
npm run deploy                   # GitHub Pages (after adding gh-pages script)
aws s3 sync dist/ s3://bucket    # AWS S3
docker build -t vkprecision .    # Docker
```

For any deployment issues, check the host's build logs first — most failures are missing dependencies or wrong build/output paths.
