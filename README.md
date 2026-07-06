# Tidal Coding Camp — Wix Headless site

A teen summer coding camp on a Brittany tidal island where the causeway floods twice a day, so sessions are timed to the tide tables. Built for **HEADLESS DAY**.

**Live:** https://tidal-codi-8d0dc8a1-shaykovach.wix-site-host.com

## Stack
- **Astro 5** (SSR, `output: "server"`) on **Wix Headless** via `@wix/astro` + Wix runtime adapter
- **`@wix/data`** CMS — `CamperProjects` gallery + `Applications` inquiry collection
- **`@wix/sdk`** / `@wix/essentials` (elevated server calls)
- Vanilla TS/CSS, one `<canvas>` for the signature waterline-typography banner — no UI framework runtime on the page

## Design
Coastal-cartographic editorial. **Gloock** display + **Spline Sans** body. Palette `#13505B` teal / `#FFC857` amber on warm paper `#F2F0E6`. Signature device: a thin amber **waterline** that runs sitewide (heading underlines, hero high-water mark, and the live tide clock).

## Pages (7)
`/` Home · `/program` · `/schedule` (live tide clock + 7-day almanac) · `/island` (causeway cross-section) · `/projects` (12 CMS projects) · `/apply` (application form → `@wix/data`) · `/faq`

## Notable engineering
- **Live tide clock** driven by a semidiurnal M2 model (~12h 25m); animated SVG + generated almanac.
- **Waterline-typography canvas**: headline reads amber above the water line and paper below it, with an animated crisp waterline over a cartographic grid.
- **LCP**: real causeway photo as responsive `<picture>` (webp, ~161 KB), preloaded with `fetchpriority="high"`, explicit dimensions (no CLS).
- **SEO**: per-page titles/descriptions, `Course` + `FAQPage` + `ItemList` JSON-LD, canonical, sitemap, robots.
- **A11y**: skip link, focus rings, labelled inputs, error-below-field with focus-to-first-invalid, `prefers-reduced-motion`.

## Develop
```bash
npm install --registry=https://npm.dev.wixpress.com/
npm run dev       # wix dev
npm run build     # wix build
npm run release   # publish to Wix
```

## CMS provisioning
`src/pages/api/setup.ts` creates the `CamperProjects` and `Applications` collections and seeds the projects (token-guarded, one-time). The apply form posts to `src/pages/api/apply.ts`, which validates server-side and inserts into `Applications`.
