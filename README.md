VKPrecision site - Ready for GitHub Pages

This repository contains a static site in the `docs/` folder.

To host on GitHub and use the custom domain `www.vkptech.in`, follow the steps in the root README or run the commands below.

Quick push commands (replace USERNAME and REPO):

```bash
# initialize and commit
git init
git add .
git commit -m "Initial site commit"

# create main branch and push (HTTPS example)
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```

GitHub Pages configuration:
- In repo settings -> Pages, set source to `Deploy from a branch` -> `main` branch -> `/docs` folder.
- The `docs/CNAME` file already contains `www.vkptech.in`.
- Add a DNS CNAME record for `www` pointing to `USERNAME.github.io` (replace USERNAME).
- Enable HTTPS in Pages settings after DNS propagates.
