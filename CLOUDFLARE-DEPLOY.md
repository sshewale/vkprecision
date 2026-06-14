# Cloudflare Pages Deployment Guide — www.vkptech.in

Complete step-by-step guide to deploy the VKPrecision website on **Cloudflare Pages** (free) while keeping **MinkHost for email** (`info@vkptech.in`).

**Time required:** ~30 minutes (plus 15 min–24 hr DNS propagation)
**Cost:** ₹0/month

---

## Table of Contents

1. [What you'll have at the end](#1-what-youll-have-at-the-end)
2. [Prerequisites](#2-prerequisites)
3. [Push code to GitHub](#3-push-code-to-github)
4. [Create Cloudflare account](#4-create-cloudflare-account)
5. [Deploy to Cloudflare Pages](#5-deploy-to-cloudflare-pages)
6. [Connect your domain `www.vkptech.in`](#6-connect-your-domain-wwwvkptechin)
7. [Keep email on MinkHost (important MX records)](#7-keep-email-on-minkhost-important-mx-records)
8. [Verify everything works](#8-verify-everything-works)
9. [Future updates — auto-deploy workflow](#9-future-updates--auto-deploy-workflow)
10. [Troubleshooting](#10-troubleshooting)
11. [Optional optimisations](#11-optional-optimisations)

---

## 1. What you'll have at the end

| Service | Hosted on | Cost |
|---------|-----------|------|
| Website (`https://www.vkptech.in`) | **Cloudflare Pages** | Free |
| Email (`info@vkptech.in`) | **MinkHost cPanel** | Already paid |
| Domain (`vkptech.in`) | Your registrar | Already paid |
| SSL certificate | Cloudflare (auto) | Free |
| CDN / DDoS protection | Cloudflare (auto) | Free |

Every time you push code to GitHub, Cloudflare **automatically rebuilds and deploys** the site within 1–2 minutes.

---

## 2. Prerequisites

- [ ] Node.js 18+ installed (`node -v` to verify)
- [ ] Git installed (`git --version`)
- [ ] A **GitHub account** (free — sign up at <https://github.com/signup>)
- [ ] Access to your domain registrar (wherever `vkptech.in` was bought)
- [ ] MinkHost cPanel access (only needed if you keep email on MinkHost)

---

## 3. Push code to GitHub

### Step 3.1 — Initialise git

In PowerShell:

```powershell
cd "c:\Users\Satish.Shewale\OneDrive - ENCORA\outward\website"
git init
git add .
git commit -m "Initial commit: VKPrecision website"
```

### Step 3.2 — Create a GitHub repo

1. Go to <https://github.com/new>.
2. **Repository name:** `vkprecision-website` (or anything you like).
3. **Visibility:** Private is fine; Public also works.
4. **Do NOT** check "Add a README" — your project already has one.
5. Click **Create repository**.

### Step 3.3 — Push your code

GitHub will show commands. Use the **"…or push an existing repository"** block:

```powershell
git remote add origin https://github.com/YOUR_USERNAME/vkprecision-website.git
git branch -M main
git push -u origin main
```

You'll be prompted to log in (use a Personal Access Token or GitHub Desktop for easier auth).

✅ Verify: refresh your GitHub repo page — all your files should be visible.

---

## 4. Create Cloudflare account

1. Go to <https://dash.cloudflare.com/sign-up>.
2. Sign up with your email + a strong password.
3. Verify your email (click the link in your inbox).
4. **Skip** "Add a website" for now — you'll do this from the Pages flow.

---

## 5. Deploy to Cloudflare Pages

### Step 5.1 — Start the Pages project

1. In Cloudflare dashboard, left sidebar → **Workers & Pages**.
2. Click **Create application** → tab **Pages** → **Connect to Git**.
3. Click **Connect GitHub** → authorise Cloudflare to access your repos.
4. Select your `vkprecision-website` repo → **Begin setup**.

### Step 5.2 — Build configuration

Fill in these exact values:

| Field | Value |
|-------|-------|
| **Project name** | `vkprecision` (this becomes part of the temp URL) |
| **Production branch** | `main` |
| **Framework preset** | **Vite** |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Root directory** | (leave empty) |
| **Environment variables** | (none needed for now) |

Click **Save and Deploy**.

### Step 5.3 — Watch the build

Cloudflare will:

1. Clone your repo
2. Install dependencies (`npm install`)
3. Run `npm run build`
4. Deploy `dist/` to its global edge network

This takes 1–3 minutes. You'll see live logs.

When done, you'll get a URL like:

```
https://vkprecision.pages.dev
```

✅ **Open that URL — your site is already LIVE on Cloudflare's CDN.** It's just on a `pages.dev` subdomain. Next step: connect your real domain.

---

## 6. Connect your domain `www.vkptech.in`

You have two paths. **Path A is recommended** (moves DNS to Cloudflare — get extra speed, security, analytics).

---

### Path A — Move DNS to Cloudflare (recommended)

#### Step 6.1 — Add your domain to Cloudflare

1. In Cloudflare dashboard → top → **Add a domain** → enter `vkptech.in` (without `www` or `https`).
2. Choose the **Free plan** → Continue.
3. Cloudflare will **scan your existing DNS records** from MinkHost. This usually takes 30 seconds.
4. **Important:** Review the imported records. Make sure these are present:
   - `MX` records (for email) — these point to MinkHost mail server. **Must be kept.**
   - `TXT` records for SPF/DKIM (email auth) — **must be kept**.
   - Any `A` / `CNAME` records for email subdomains (`mail.vkptech.in`, `webmail.vkptech.in`) — **must be kept**.

   If anything is missing, click **Add record** and add it manually. (Get the values from your MinkHost cPanel → **Zone Editor**.)

5. Click **Continue**.

#### Step 6.2 — Change nameservers at your registrar

Cloudflare will show you 2 nameservers, e.g.:

```
kate.ns.cloudflare.com
bob.ns.cloudflare.com
```

1. Log in to wherever you bought `vkptech.in` (GoDaddy / BigRock / Hostinger / MinkHost client area).
2. Find **DNS / Nameservers / Domain settings**.
3. Switch from current nameservers to Cloudflare's two nameservers.
4. Save.

⏳ DNS propagation: **15 min to 24 hours** (usually under 1 hour).

Cloudflare will email you once activation is detected.

#### Step 6.3 — Add custom domain to Pages

1. In Cloudflare → **Workers & Pages** → your `vkprecision` project → **Custom domains** tab.
2. Click **Set up a custom domain** → enter `www.vkptech.in` → **Continue** → **Activate domain**.
3. Repeat for the apex: **Set up a custom domain** → `vkptech.in` → **Continue** → **Activate domain**.

Cloudflare automatically:
- Creates the necessary DNS records (CNAME for `www`, AAAA/A for apex)
- Issues a free SSL certificate (1–5 minutes)

#### Step 6.4 — Set up redirect from `vkptech.in` → `www.vkptech.in`

1. Cloudflare dashboard → `vkptech.in` domain → **Rules → Redirect Rules** → **Create rule**.
2. Configure:
   - **Rule name:** `Redirect apex to www`
   - **When incoming requests match:** Custom filter expression
   - **Field:** Hostname → **Operator:** equals → **Value:** `vkptech.in`
   - **Then:**
     - **Type:** Static
     - **URL:** `https://www.vkptech.in${uri}`
     - **Status:** 301
     - **Preserve query string:** ✅ Yes
3. **Deploy**.

✅ Now `https://vkptech.in` → redirects to `https://www.vkptech.in`.

---

### Path B — Keep your current DNS (don't change nameservers)

Use this if you want to keep DNS at your registrar (more complex DNS records, less automation).

#### Step 6.1 — Add custom domain in Cloudflare Pages

1. In Cloudflare → **Workers & Pages** → your project → **Custom domains** → **Set up a custom domain** → `www.vkptech.in`.
2. Cloudflare will show DNS records you need to add at your registrar:
   - `CNAME` `www` → `vkprecision.pages.dev`

#### Step 6.2 — Add records at your registrar

Log in to your registrar's DNS panel and add:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| CNAME | `www` | `vkprecision.pages.dev` | 3600 |
| CNAME | `@` (apex) | `vkprecision.pages.dev` | 3600 |

> ⚠️ Some registrars don't allow CNAME at apex (`@`). If yours doesn't:
> - Use an `ALIAS` or `ANAME` record instead (same target), OR
> - Switch to **Path A** which handles this automatically.

Wait 15 min – 24 hr for DNS propagation.

---

## 7. Keep email on MinkHost (important MX records)

If you went with **Path A** (DNS at Cloudflare), make sure your email keeps working. You need these DNS records — most should auto-import, but verify them.

### Step 7.1 — Find your MinkHost email records

1. Login to MinkHost cPanel.
2. Open **Zone Editor** (or **Advanced DNS Zone Editor**).
3. Note down all records of type `MX`, `TXT`, `CNAME` related to email.

Typical MinkHost email records look like:

| Type | Name | Value | Priority |
|------|------|-------|----------|
| MX | `vkptech.in` | `mail.vkptech.in` | 0 |
| A | `mail` | `<MinkHost server IP>` | — |
| CNAME | `webmail` | `vkptech.in` | — |
| TXT | `vkptech.in` | `v=spf1 +a +mx +ip4:<MinkHost IP> ~all` | — |
| TXT | `default._domainkey` | `v=DKIM1; k=rsa; p=...` (long string) | — |

### Step 7.2 — Verify these exist in Cloudflare DNS

1. Cloudflare dashboard → `vkptech.in` → **DNS → Records**.
2. Check all the records from Step 7.1 are present.
3. If missing, click **Add record** and add them exactly as shown in MinkHost cPanel.
4. **Important:** For all email-related records (`MX`, `mail.`, `webmail.`, `TXT SPF/DKIM`), set the **Proxy status** to **DNS only** (grey cloud icon, NOT orange).
   - Cloudflare proxy doesn't work for email — must be DNS only.

### Step 7.3 — Test email

1. Send a test email **to** `info@vkptech.in` from any external email.
2. Check it arrives in MinkHost webmail (`https://webmail.vkptech.in` or cPanel → Webmail).
3. Send a test email **from** `info@vkptech.in` to your personal Gmail/Outlook.
4. ✅ If both work, email is correctly routed via MinkHost while website is on Cloudflare.

---

## 8. Verify everything works

Open each of these and confirm:

- [ ] `https://www.vkptech.in` → site loads with HTTPS padlock 🔒
- [ ] `https://vkptech.in` → redirects to `https://www.vkptech.in` (after redirect rule)
- [ ] `http://www.vkptech.in` → redirects to HTTPS automatically (Cloudflare default)
- [ ] All navbar links scroll to correct sections
- [ ] Mobile menu (hamburger) works on phone view
- [ ] Contact form shows "Thank you" success message
- [ ] Footer links work
- [ ] No console errors (DevTools → Console)
- [ ] Email to/from `info@vkptech.in` works (test from another address)

### Performance check

Open <https://pagespeed.web.dev/> → enter `https://www.vkptech.in` → run audit.
Expected score: **90+** on Performance, Accessibility, Best Practices, SEO.

### SSL check

Open <https://www.ssllabs.com/ssltest/analyze.html?d=www.vkptech.in> → should get **A** grade.

---

## 9. Future updates — auto-deploy workflow

The beauty of Cloudflare Pages: **every git push auto-deploys**.

### Standard update workflow

```powershell
cd "c:\Users\Satish.Shewale\OneDrive - ENCORA\outward\website"

# Make your changes to .tsx/.css files

# Test locally first
npm run dev

# Once happy, commit & push
git add .
git commit -m "Update hero section copy"
git push
```

Cloudflare detects the push, runs `npm run build`, and deploys within 1–3 minutes.

You'll get an email notification when deploy completes.

### Preview deployments (free)

Every **non-main branch** gets its own preview URL automatically:

```powershell
git checkout -b new-services-section
# make changes
git push -u origin new-services-section
```

Cloudflare deploys it at something like:
```
https://new-services-section.vkprecision.pages.dev
```

Share this URL to get client feedback before merging to `main`.

### Rollback to previous version

1. Cloudflare → Pages → your project → **Deployments** tab.
2. Find any previous successful deployment.
3. Click **⋯** → **Rollback to this deployment**.
4. Live in 30 seconds.

---

## 10. Troubleshooting

### Build fails on Cloudflare

1. Check the build log in Cloudflare Pages → **Deployments** → click the failed build.
2. Most common: **Node version mismatch**. Fix:
   - Cloudflare Pages settings → **Environment variables** → add:
     - **Variable name:** `NODE_VERSION`
     - **Value:** `20`
   - Redeploy.
3. **Missing dependencies:** Make sure `package-lock.json` is committed and pushed.
4. **TypeScript errors:** Run `npm run build` locally first — fix any TS errors before pushing.

### Custom domain stuck on "Verifying"

- Wait. DNS propagation can take up to 24 hours, though usually faster.
- Check propagation: <https://dnschecker.org>
- Ensure nameservers were changed correctly at the registrar (Path A).
- Ensure DNS records were added correctly (Path B).

### Site loads but shows "Site Not Found" or `pages.dev` placeholder

- Custom domain not yet activated. Go to Pages → project → **Custom domains** → check status.
- Sometimes you need to remove and re-add the custom domain.

### SSL certificate not issued

- Wait 5–15 minutes after activating the custom domain.
- Cloudflare → SSL/TLS → **Overview** → set to **Full (strict)**.
- Cloudflare → SSL/TLS → **Edge Certificates** → make sure **Always Use HTTPS** is ON.

### Email stopped working after switching to Cloudflare

- This means MX records didn't transfer correctly.
- Get records from MinkHost cPanel → Zone Editor.
- Add them in Cloudflare → DNS → Records.
- Critical: all email-related records must be **DNS only** (grey cloud), NOT proxied.
- Wait 10–30 minutes for changes to propagate.

### Contact form not sending emails

This is **expected** — the form is currently client-side only. To make it actually email you:

#### Option A — Formspree (5 minutes, free for 50/mo)

1. Sign up at <https://formspree.io> (free).
2. **New form** → **Create new form** → name it "VKPrecision Contact" → copy the endpoint URL.
3. Edit `src/components/Contact.tsx`:

```tsx
const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  try {
    const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setSubmitted(true);
      setForm(initialState);
      window.setTimeout(() => setSubmitted(false), 4500);
    }
  } catch (err) {
    console.error(err);
  }
};
```

4. Commit & push:

```powershell
git add .
git commit -m "Wire contact form to Formspree"
git push
```

Cloudflare auto-deploys. Submissions will now arrive at the email you signed up with on Formspree.

#### Option B — Cloudflare Pages Functions (advanced, free)

Use Cloudflare's serverless Functions to send emails via SendGrid / Resend / your own SMTP. Happy to write this if you want — let me know.

### Want to test deploy without pushing to GitHub

```powershell
npm i -g wrangler
wrangler login
npm run build
wrangler pages deploy dist --project-name=vkprecision
```

This pushes a deploy directly from your machine without going through git.

---

## 11. Optional optimisations

After the site is live, you can enable these in Cloudflare for free:

### Speed optimisations

Cloudflare dashboard → `vkptech.in` → **Speed → Optimization**:

- ✅ **Auto Minify** → enable HTML, CSS, JS
- ✅ **Brotli** compression → enable
- ✅ **Early Hints** → enable
- ✅ **Rocket Loader** → enable (test first; sometimes breaks React apps — disable if so)

### Caching

- **Caching → Configuration** → **Caching Level: Standard**.
- **Browser Cache TTL:** 4 hours (or longer for static-only site).

### Security

- **Security → Settings**:
  - **Security Level:** Medium
  - **Bot Fight Mode:** ON (free)
  - **Challenge Passage:** 30 minutes
- **SSL/TLS → Edge Certificates**:
  - **Always Use HTTPS:** ON
  - **Automatic HTTPS Rewrites:** ON
  - **Minimum TLS Version:** TLS 1.2

### Analytics

- Cloudflare → `vkptech.in` → **Analytics & Logs → Web Analytics** → enable.
- Free, privacy-friendly, no cookies. See visitor counts, top pages, countries, etc.

### Free email forwarding (optional)

If you ever decide to move email **off** MinkHost:

- Cloudflare → `vkptech.in` → **Email → Email Routing** → enable.
- Forward `info@vkptech.in` → your personal Gmail (free).
- Useful as a backup or if MinkHost subscription expires.

---

## Quick reference card

```
=== Deploy fresh code ===
git add . && git commit -m "message" && git push
(Cloudflare auto-deploys in 1-3 min)

=== Rollback ===
Cloudflare → Pages → Deployments → click old deploy → Rollback

=== Preview branch ===
git checkout -b feature-name
git push -u origin feature-name
(Preview URL emailed to you)

=== Check site speed ===
https://pagespeed.web.dev/?url=https://www.vkptech.in

=== Check SSL ===
https://www.ssllabs.com/ssltest/analyze.html?d=www.vkptech.in

=== DNS propagation ===
https://dnschecker.org → enter vkptech.in
```

---

## Important contacts

| Need help with | Contact |
|----------------|---------|
| Cloudflare account / Pages | <https://dash.cloudflare.com/?to=/:account/support> |
| Domain DNS / nameservers | Your registrar's support |
| Email (info@vkptech.in) | MinkHost support |
| GitHub auth issues | <https://support.github.com> |

---

## Related docs in this project

- [README.md](README.md) — project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) — all deployment options
- [HOSTING-COMPARISON.md](HOSTING-COMPARISON.md) — why Cloudflare was chosen
- [MINKHOST-DEPLOY.md](MINKHOST-DEPLOY.md) — alternative deploy on MinkHost only
