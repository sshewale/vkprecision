# Hosting Comparison — VKPrecision Valuation & Advisory

A practical comparison of hosting options for this static React + TypeScript Vite site, with pricing, India-specific performance notes, and a final recommendation.

---

## TL;DR — Recommendation

**Cloudflare Pages** for this site. Free, unlimited bandwidth, fast in India (Mumbai/Delhi/Chennai PoPs), free SSL, dead-simple deployment. The VKPrecision site is static — there's no reason to pay anything.

- If you prefer the smoothest developer experience over absolute cost: **Vercel** (also free tier).
- If you want an Indian provider for GST invoicing: **Hostinger India** (paid).

---

## Comparison chart

| Host | Free tier | Paid plan | Bandwidth (free) | India performance | Custom domain + SSL | Best for |
|------|-----------|-----------|------------------|-------------------|---------------------|----------|
| **Cloudflare Pages** | ✅ Yes | $20/mo (optional) | **Unlimited** | ⭐⭐⭐⭐⭐ (Mumbai, Delhi, Chennai, Bengaluru, Hyderabad) | Free | **Best overall — recommended** |
| **Vercel** | ✅ Yes | $20/mo (Pro) | 100 GB/mo | ⭐⭐⭐⭐ (Mumbai edge) | Free | Best DX, instant deploys |
| **Netlify** | ✅ Yes | $19/mo (Pro) | 100 GB/mo | ⭐⭐⭐⭐ (Mumbai edge) | Free | Forms + serverless extras |
| **GitHub Pages** | ✅ Yes | — | 100 GB/mo (soft) | ⭐⭐⭐ (via Fastly) | Free | Simple, repo-driven |
| **Firebase Hosting** | ✅ Yes | Pay-as-you-go | 10 GB/mo | ⭐⭐⭐⭐ | Free | If using Firebase backend |
| **Render** | ✅ Yes | — | 100 GB/mo | ⭐⭐⭐ | Free | Lightweight static |
| **AWS S3 + CloudFront** | 1 year free | ~$1–5/mo after | 1 TB free year-1 | ⭐⭐⭐⭐⭐ (Mumbai region) | Free via ACM | Enterprise / fine control |
| **Hostinger India** | ❌ | **₹149–399/mo** (~$2–5) | 100 GB+ | ⭐⭐⭐⭐ (India datacenter) | Free | **Indian GST invoice needed** |
| **GoDaddy India** | ❌ | ₹199–999/mo | Varies | ⭐⭐⭐ | Often paid | Already using their domain |
| **Bluehost India** | ❌ | ₹199–499/mo | Unmetered | ⭐⭐⭐ | Free | Traditional cPanel preference |

---

## Detailed pricing & features

### 🏆 Cloudflare Pages — Recommended

| | |
|---|---|
| **Price** | **Free forever** for this site |
| **Bandwidth** | Unlimited (truly, no asterisk) |
| **Builds** | 500/month free |
| **Sites** | Unlimited |
| **Team seats** | 1 (free), more on $20/mo Workers Paid |
| **SSL** | Free, auto-renewed |
| **Custom domain** | Free |
| **India edge** | Mumbai, Delhi, Chennai, Bengaluru, Hyderabad |
| **DDoS protection** | ✅ Included |
| **Analytics** | ✅ Built-in (free) |

**Why for VKPrecision:** Largest Indian edge presence → fastest load times for Pune/Maharashtra clients. No bandwidth surprises if the site goes viral or gets scraped.

**Caveats:** Slightly less polished UI than Vercel; build logs are basic.

---

### Vercel

| | |
|---|---|
| **Price (Hobby)** | Free — for non-commercial / personal |
| **Price (Pro)** | **$20/month** per user |
| **Bandwidth (free)** | 100 GB/mo |
| **Bandwidth (Pro)** | 1 TB/mo, then $0.15/GB |
| **Builds** | 100 hrs/mo free, 400 hrs/mo Pro |
| **India edge** | Mumbai (BOM1) |
| **SSL + custom domain** | Free |
| **Preview deploys** | Every git push gets a unique URL |

**Caveat for VKPrecision:** Vercel's free Hobby plan technically prohibits commercial use. For a business site like VKPrecision, the **letter of the ToS requires Pro at $20/mo** — though enforcement is rare for low-traffic sites. Cloudflare has no such restriction.

---

### Netlify

| | |
|---|---|
| **Price (Starter)** | Free |
| **Price (Pro)** | **$19/month** per member |
| **Bandwidth (free)** | 100 GB/mo |
| **Build minutes** | 300/mo free, 1000/mo Pro |
| **India edge** | Mumbai PoP |
| **Forms** | 100 submissions/mo free (Netlify Forms) |
| **Functions** | 125k invocations/mo free |

**Edge over Vercel:** Built-in Netlify Forms — you could wire the contact form to it without a backend in 2 minutes. Submissions go to your email.

---

### GitHub Pages

| | |
|---|---|
| **Price** | Free |
| **Bandwidth** | 100 GB/mo (soft limit) |
| **Builds** | Via GitHub Actions (2000 min/mo free) |
| **India CDN** | Via Fastly (decent but not best) |
| **SSL + custom domain** | Free |
| **Limitation** | Public repo for free (private needs GitHub Pro) |

**Trade-off:** Cheapest, but you need to set `base: '/repo-name/'` in `vite.config.ts` unless using a custom domain. No serverless functions if you ever need to wire the contact form server-side.

---

### Hostinger India — best Indian provider

| | |
|---|---|
| **Single Web Hosting** | ₹149/mo (~$1.80) — 1 site, 50 GB |
| **Premium** | ₹249/mo (~$3) — 100 sites, 100 GB SSD |
| **Business** | ₹399/mo (~$5) — 200 GB, daily backups |
| **India datacenter** | ✅ Mumbai |
| **SSL** | Free |
| **GST invoice** | ✅ Yes |
| **Email hosting** | ✅ Included (e.g. info@vkptech.in) |
| **cPanel-style admin** | ✅ Yes |

**Why this matters for VKPrecision:**

- ✅ **GST invoice** — claim as business expense
- ✅ **Business email** (info@vkptech.in) — bundled, not separate
- ✅ **Indian payment support** (UPI, net banking, INR billing)
- ⚠️ Slightly slower than Cloudflare's edge network
- ⚠️ Manual FTP/SSH deploy (or git via cPanel) — less polished than Vercel/CF

---

## Cost-of-ownership comparison (3-year horizon)

For a low-traffic business site (~10k visits/month):

| Host | Year 1 | Year 2 | Year 3 | Total |
|------|--------|--------|--------|-------|
| **Cloudflare Pages** | ₹0 | ₹0 | ₹0 | **₹0** |
| **Vercel Hobby** (technically non-commercial) | ₹0 | ₹0 | ₹0 | ₹0 |
| **Vercel Pro** (ToS-compliant) | ~₹20,000 | ~₹20,000 | ~₹20,000 | ~₹60,000 |
| **Netlify Pro** | ~₹19,000 | ~₹19,000 | ~₹19,000 | ~₹57,000 |
| **Hostinger Premium** (with email) | ₹2,988 | ₹2,988 | ₹2,988 | **~₹9,000** |
| **AWS S3 + CloudFront** | ₹0 (free tier) | ~₹2,400 | ~₹2,400 | ~₹4,800 |

> Domain (`vkptech.in`) ≈ ₹600–1,200/year extra, regardless of host.

---

## Final recommendation for VKPrecision

### Pick **Cloudflare Pages** if:

- You want zero cost forever
- You want fastest performance in India
- You're fine with email hosted separately (Google Workspace ~₹136/user/mo, or Zoho Mail free for 5 users)

### Pick **Hostinger India** if:

- You need **GST invoices** for business accounting
- You want **info@vkptech.in email** bundled with hosting
- You prefer Indian customer support / INR billing
- One-stop shop matters more than absolute speed

### Pick **Vercel** if:

- You'll iterate on the site frequently and value the smoothest deploy experience
- You're okay with $20/mo Pro for commercial use compliance

---

## My pick for this exact case

> **Cloudflare Pages + Zoho Mail (free) + domain on any registrar** = ₹0/month hosting, ₹600–1,200/year for the `.in` domain, professional `@vkptech.in` email free.

If GST invoicing for the hosting bill matters → **Hostinger Premium at ₹249/mo** is the cleanest single-vendor option.

---

## Decision flowchart

```
Do you need a GST invoice for hosting?
├── YES → Hostinger India Premium (₹249/mo, includes email)
└── NO  → Is fastest India performance the priority?
         ├── YES → Cloudflare Pages (free) + Zoho Mail (free)
         └── NO  → Do you want premium developer experience + previews?
                   ├── YES → Vercel (Pro $20/mo for commercial)
                   └── NO  → GitHub Pages (free, simplest)
```

---

## Related docs

- [DEPLOYMENT.md](DEPLOYMENT.md) — step-by-step deployment instructions for each host
- [README.md](README.md) — project overview, structure, scripts
