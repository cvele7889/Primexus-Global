# Primexus Global D.O.O.

Corporate website for **Primexus Global D.O.O.** — BPO, call center and customer experience services across Europe.

## Company Info

- **Name:** Primexus Global D.O.O.
- **Activity:** 82.20 — Call center activities
- **Address:** Hadži Ruvimova br.4
- **Email:** info@primexusglobal.com (primexus.business@outlook.com)
- **Phone:** public number via `VITE_PUBLIC_PHONE` (see below)

## Languages

- Serbian (SR)
- English (EN)
- German (DE)
- Russian (RU)

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deploy (GitHub Pages)

**One-time setup:**

1. Open [Settings → Pages](https://github.com/cvele7889/Primexus-Global/settings/pages)
2. Under **Build and deployment → Source**, select **Deploy from a branch**
3. Branch: **gh-pages**, folder: **/ (root)**
4. Click **Save**

If `gh-pages` branch is not in the list yet, wait for the first successful GitHub Actions run to finish — it creates the branch automatically.

Every push to `main` builds and updates the site.

### Public phone number

The real phone number must **not** be stored in this repo. Use a virtual/business number from your carrier that forwards calls to your private mobile, then set it in GitHub:

1. Repo → **Settings** → **Secrets and variables** → **Actions** → **Variables**
2. Add `VITE_PUBLIC_PHONE` in E.164 format (e.g. `+381112233445`)
3. Push to `main` or re-run the deploy workflow

Until that variable is set, the phone field is hidden on the contact page.

Live URL: **https://cvele7889.github.io/Primexus-Global/**
