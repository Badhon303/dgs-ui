# DGS — Double Glazing Solutions

A complete Next.js App Router portfolio for architectural windows, doors and glass, built in this workspace from the supplied assets. It uses TypeScript, Tailwind CSS 4, Motion, GSAP ScrollTrigger and Lucide icons. Static server-rendered HTML exports to `out/` for portable hosting.

## Run

Requires Node.js 22.18+ (24 recommended).

```sh
npm install
npm run dev
```

On Windows PowerShell where script execution is restricted, use `npm.cmd` instead of `npm`.

```sh
npm run typecheck
npm run lint
npm run build
npm start
```

`npm start` serves the production export at `http://localhost:3000`. Set `PORT` to change the port. Serve `out/` on your production static host; configure its unknown-path fallback as a **404** using `404.html`, not an SPA success fallback. The Next export has slash-terminated routes. The included server demonstrates this behavior.

The build includes a small compatibility pass for Next.js's [Windows static-export segment filename issue](https://github.com/vercel/next.js/issues/92339). It preserves original exported payloads and copies their flattened names so client navigation and prefetching work on any static host.

## Edit business information

- `src/data/site.ts`: identity, description, contact details, socials, service/team/client confirmation flags, FAQs, process and navigation.
- `src/data/products.ts`: five system references, text, applications and discussion notes.
- `src/data/projects.ts`: visually reviewed neutral titles, categories, descriptions and curated selection.
- `src/app/globals.css`: typography, architectural layouts, breakpoints and interface colors.

Copy `.env.example` to `.env.local` and configure the actual production URL and verified contact values before rebuilding. Contact email, phone and WhatsApp are intentionally empty until supplied. WhatsApp renders only for a plausible international number. Address/social links need verified values in `site.ts`.

`NEXT_PUBLIC_ALLOW_INDEXING=false` keeps preview builds out of search. Set it to `true` only after launch review. A valid production URL controls absolute canonicals, social previews and sitemap entries; an unconfigured build never invents a domain. There are no fake prices, ratings, warranties, project dates, locations or client testimonials.

## Contact behavior

The four-step inquiry validates interest, name, email and message, retains a draft in session storage, supports optional project details, and reviews all entered values. Product and project links prefill it.

When `NEXT_PUBLIC_CONTACT_EMAIL` is set, the final action opens a populated **email draft**. The visitor still presses Send in their own email app. With no destination, it clearly states delivery is unavailable and offers a text download. It never claims a message was delivered. No server email/CRM integration is configured; adding one requires an API route/server deployment, server-side schema validation, rate limiting and a real delivery provider. Do not put provider secrets in `NEXT_PUBLIC_*` variables.

## Add or update images

Keep originals in the corresponding `assets/` folder, then run:

```sh
npm run assets
```

This generates distinct WebP sizes (no source upscaling), blur placeholders, dimension/orientation and exposure records, exact/near-duplicate candidates and visual contact sheets in `qa/`. The review pass applies captions/focal points and creates the app icon. Product PNG geometry and existing alpha are preserved. White-backed illustrations blend gently with the editorial surface rather than undergoing destructive background removal.

Asset IDs currently follow natural filename order. When adding files, prefer names that sort after existing ones, or update references and review IDs before rebuilding. After changing the asset list, inspect the new contact sheets and update the descriptions and exclusions in the typed content and review files. Image review is editorial, not proof of performance, project identity or authorship.

Add products to `products.ts` with a unique descriptive slug and manifest image ID. Add project views to `projects.ts`; confirm related photographs before grouping them. Rebuild to generate new permanent detail routes, structured data and sitemap entries. If a live slug changes, add a redirect at the hosting layer; the static export has no server redirects.

## Experience

Routes: `/`, `/products/`, `/products/[slug]/`, `/projects/`, `/projects/[slug]/`, `/about/`, `/contact/`.

Navigation includes a systems mega menu, mobile bottom sheet, native-dialog focus management and Cmd/Ctrl+K search. Gallery categories, load-more, detail links and a lazy-loaded full-screen photo viewer work together; the viewer supports arrow keys, Escape, buttons and swipe. All project links also appear in a server-rendered browse index. GSAP owns the short desktop pinned sequence; CSS/Motion own other entrances independently. Mobile and reduced-motion visitors receive normal vertical chapters. The text marquee pauses offscreen and when the document is hidden.

## Checks and performance

The browser verification script (`node scripts/verify.mjs`) uses installed Google Chrome in headless mode to check main journeys, five responsive widths, native dialogs, validation, crawlability, 404s and automated WCAG checks. Results and screenshots go to ignored `qa/`. Adjust its executable path if your Chrome installation differs. The script uses test-only inquiry details and never sends a message.

Verification results and measured Lighthouse numbers are documented in `VALIDATION.md`; these are measurements of a local production build, not ranking or real-user performance promises.

## Launch requirements

1. Confirm the official brand treatment, product category names and source illustration labels. The file labeled gable windows is a frame section, not a triangular-window photograph.
2. Supply verified contact email, phone, address/service area, socials and production domain. Confirm publishing rights to the supplied imagery.
3. Confirm project identities, image groupings, technical specifications and actual offerings before adding richer factual stories or guarantees.
4. Confirm team identities and client relationships before enabling those modules. They are intentionally omitted from the current public layout.
5. Review the production domain/canonicals and sitemap, then enable indexing. Optionally verify domain ownership in Google Search Console and submit `/sitemap.xml`.
6. Choose email-draft contact or configure a real server delivery integration. Rebuild after changing any public configuration.

Image provenance and licensing notes: `IMAGE-CREDITS.md`.
