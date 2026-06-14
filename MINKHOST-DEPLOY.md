# MinkHost Deployment Guide — www.vkptech.in

Step-by-step instructions to deploy the VKPrecision website to **www.vkptech.in** on MinkHost shared hosting (cPanel).

---

## Pre-flight checklist

Before starting, make sure you have:

- [ ] MinkHost welcome email with cPanel login URL, username, password
- [ ] FTP credentials (also in welcome email) — backup access method
- [ ] MinkHost nameservers (e.g. `ns1.minkhost.com`, `ns2.minkhost.com`)
- [ ] Access to your domain registrar (wherever `vkptech.in` was bought)
- [ ] Node.js 18+ installed locally (`node -v` to check)

---

## Step 1 — Build the production site

On your local machine:

```powershell
cd "c:\Users\Satish.Shewale\OneDrive - ENCORA\outward\website"
npm install
npm run build
```

This produces a `dist/` folder containing the static site:

```
dist/
├── index.html
├── favicon.svg
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

**You will upload the contents of `dist/` (not the folder itself).**

---

## Step 2 — Point your domain to MinkHost

Skip this step if `www.vkptech.in` already loads a MinkHost default page.

### Option A — Use MinkHost nameservers (recommended)

1. Find MinkHost's nameservers in their welcome email (e.g. `ns1.minkhost.com`, `ns2.minkhost.com`).
2. Log in to your domain registrar (GoDaddy / BigRock / Hostinger / etc.).
3. Open `vkptech.in` → **DNS / Nameservers** → switch from registrar's nameservers to MinkHost's.
4. Save. DNS propagation: **15 min to 24 hours**.

### Option B — Keep registrar's DNS, add A records

1. Find MinkHost's server IP in their welcome email or cPanel dashboard.
2. In your registrar's DNS panel, add:

   | Type | Name | Value | TTL |
   |------|------|-------|-----|
   | A | `@` | `<MinkHost IP>` | 3600 |
   | A | `www` | `<MinkHost IP>` | 3600 |

3. Save.

### Verify DNS propagation

Open <https://dnschecker.org> → enter `vkptech.in` → confirm it resolves to MinkHost's IP from multiple global locations.

Or via PowerShell:

```powershell
nslookup www.vkptech.in
```

---

## Step 3 — Log in to cPanel

cPanel URL is usually one of:

- `https://www.vkptech.in:2083` (after DNS points to MinkHost)
- `https://server.minkhost.com:2083`
- Or a one-click login from MinkHost's client area

Use the username + password from your welcome email.

---

## Step 4 — Upload the site

### Method A — cPanel File Manager (easiest, no extra software)

1. **Zip the build output** locally:

   ```powershell
   cd "c:\Users\Satish.Shewale\OneDrive - ENCORA\outward\website"
   Compress-Archive -Path "dist\*" -DestinationPath "vkprecision-site.zip" -Force
   ```

2. In cPanel, open **File Manager** → navigate to `public_html/`.

3. **Delete any default files** in `public_html/` (`index.html`, `default.html`, `cgi-bin/` you can leave).

4. Click **Upload** in the toolbar → select `vkprecision-site.zip` → wait for upload to finish.

5. Go back to File Manager → right-click the zip → **Extract** → extract into `public_html/`.

6. Delete the zip after extraction.

After this, `public_html/` should contain:

```
public_html/
├── index.html
├── favicon.svg
└── assets/
    ├── index-[hash].js
    └── index-[hash].css
```

### Method B — FTP (FileZilla)

1. Download FileZilla: <https://filezilla-project.org/>
2. Open FileZilla → **File → Site Manager → New Site**:
   - **Host:** `ftp.vkptech.in` (or MinkHost server IP)
   - **Port:** 21
   - **Protocol:** FTP
   - **Encryption:** Use explicit FTP over TLS if available
   - **User:** FTP username from welcome email
   - **Password:** FTP password
3. Click **Connect**.
4. On the right pane, navigate to `/public_html/`.
5. On the left pane, navigate to your `dist/` folder.
6. **Select all files inside `dist/`** (Ctrl+A) → drag to the right pane.
7. Wait for upload to complete.

### Method C — Git deployment (if cPanel has Git Version Control)

1. Push the project to a GitHub repo.
2. In cPanel → **Git Version Control** → **Create**.
3. Clone URL: your repo URL.
4. Deployment path: `/public_html/`.
5. Click **Create**.

⚠️ Note: this clones the *source code*, not the built output. You'd need a `.cpanel.yml` deploy script to run `npm install && npm run build` and copy `dist/*` to `public_html/`. Method A is simpler for a static site.

---

## Step 5 — Add `.htaccess` for routing, HTTPS, caching

In cPanel **File Manager** → inside `public_html/` → click **+ File** → name it **`.htaccess`** (with leading dot) → click **Create**.

Right-click `.htaccess` → **Edit** → paste this:

```apache
# === Force HTTPS ===
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://www.vkptech.in/$1 [R=301,L]

# === Force www ===
RewriteCond %{HTTP_HOST} ^vkptech\.in [NC]
RewriteRule ^(.*)$ https://www.vkptech.in/$1 [R=301,L]

# === SPA fallback (safe for anchor-only nav too) ===
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# === Aggressive cache for hashed assets ===
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType text/css "access plus 1 year"
  ExpiresByType application/javascript "access plus 1 year"
  ExpiresByType image/svg+xml "access plus 1 year"
  ExpiresByType image/jpeg "access plus 6 months"
  ExpiresByType image/png "access plus 6 months"
  ExpiresByType image/webp "access plus 6 months"
  ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# === Don't cache index.html ===
<FilesMatch "index\.html$">
  Header set Cache-Control "no-cache, must-revalidate"
</FilesMatch>

# === Gzip compression ===
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript application/json image/svg+xml font/woff2
</IfModule>

# === Security headers ===
<IfModule mod_headers.c>
  Header set X-Content-Type-Options "nosniff"
  Header set X-Frame-Options "SAMEORIGIN"
  Header set Referrer-Policy "strict-origin-when-cross-origin"
</IfModule>
```

Save.

---

## Step 6 — Enable free SSL (HTTPS)

In cPanel, look for one of these icons:

- **SSL/TLS Status**
- **Let's Encrypt SSL**
- **AutoSSL**

Steps:

1. Open the SSL tool.
2. Select both `vkptech.in` and `www.vkptech.in`.
3. Click **Run AutoSSL** (or **Issue Certificate**).
4. Wait 5–10 minutes for issuance.
5. Verify by visiting `https://www.vkptech.in` — should show a padlock 🔒.

If AutoSSL is missing or fails, **contact MinkHost support** and ask them to enable free Let's Encrypt SSL — this is standard for every legitimate host.

---

## Step 7 — Verify the live site

Open each of these and confirm it works:

- [ ] `https://www.vkptech.in` → site loads with HTTPS padlock
- [ ] `https://vkptech.in` → redirects to `https://www.vkptech.in`
- [ ] `http://www.vkptech.in` → redirects to HTTPS
- [ ] Navbar links scroll to correct sections
- [ ] Mobile menu (hamburger) works on phone view
- [ ] Contact form shows "Thank you" success message on submit
- [ ] Footer links work
- [ ] No console errors (open DevTools → Console)
- [ ] Lighthouse score 85+ (DevTools → Lighthouse → Run audit)

---

## Future updates — re-deploy workflow

Every time you change the code:

```powershell
# 1. Build
npm run build

# 2. Zip the new dist
Compress-Archive -Path "dist\*" -DestinationPath "vkprecision-site.zip" -Force

# 3. cPanel File Manager:
#    - Delete old contents of public_html/ (except .htaccess and cgi-bin/)
#    - Upload + extract vkprecision-site.zip
```

> ⚠️ **Never delete `.htaccess`** — it has your HTTPS + routing rules. If you accidentally delete it, recreate it from Step 5.

---

## Troubleshooting

### Site shows "Index of /" file listing instead of the site

`index.html` isn't in `public_html/` root, or it's nested inside a `dist/` subfolder. Fix:

```
public_html/
├── index.html          ✅ correct — index.html at root
└── ...

public_html/
└── dist/
    └── index.html      ❌ wrong — needs to be moved up
```

### Page loads but CSS / JS broken

- Check browser DevTools → Network tab for 404s.
- Usually means the `assets/` folder didn't upload completely. Re-upload.

### Domain doesn't resolve

- Run `nslookup www.vkptech.in` — confirm it shows MinkHost's IP.
- Wait longer (DNS propagation can take up to 24 hours).
- Use <https://dnschecker.org> to check global propagation.

### SSL padlock missing / "Not Secure"

- AutoSSL hasn't run yet — wait 10 min or trigger manually.
- Cached HTTP version in browser — hard refresh (Ctrl+Shift+R) or open in Incognito.
- Mixed content (some assets loaded over HTTP) — should NOT happen with this site since all paths are relative.

### Contact form submissions don't go anywhere

By design — the form is currently client-side only. To make it actually email you:

**Option 1 — Formspree (easiest, free for 50/mo):**

1. Sign up at <https://formspree.io> → create a form → copy the endpoint URL.
2. Edit `src/components/Contact.tsx`:
   ```tsx
   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
     e.preventDefault();
     await fetch('https://formspree.io/f/YOUR_ID', {
       method: 'POST',
       headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
       body: JSON.stringify(form),
     });
     setSubmitted(true);
     setForm(initialState);
   };
   ```
3. Rebuild and re-upload.

**Option 2 — cPanel mail() / PHP backend:**

Create `public_html/submit.php` and POST the form to it. Requires PHP changes; happy to write this if you want.

### "500 Internal Server Error" after adding .htaccess

A directive isn't supported by your PHP/Apache version. Remove modules one by one:

1. First, remove the `<IfModule mod_headers.c>` block.
2. Test. If still broken, remove `<IfModule mod_deflate.c>`.
3. Test again.

Or contact MinkHost support — they'll know which modules are enabled.

### Can't connect via FTP

- Check FTP credentials match the welcome email exactly.
- Try **passive mode** in FileZilla settings.
- Try port 21 (FTP) or 22 (SFTP if supported).
- Ask MinkHost support for FTP server hostname if unclear.

---

## Quick reference

```powershell
# Build + zip in one go
npm run build && Compress-Archive -Path "dist\*" -DestinationPath "vkprecision-site.zip" -Force

# Then:
# 1. cPanel → File Manager → public_html/
# 2. Delete old files (keep .htaccess)
# 3. Upload + extract vkprecision-site.zip
# 4. Done
```

---

## Support contacts

- **MinkHost support:** check their website for live chat or email
- **Domain registrar support:** wherever you bought `vkptech.in`
- **DNS propagation checker:** <https://dnschecker.org>
- **SSL test:** <https://www.ssllabs.com/ssltest/analyze.html?d=www.vkptech.in>
