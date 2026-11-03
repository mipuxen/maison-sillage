# Maison Sillage

A single-page **concept sneaker boutique** built with **React + Vite**, in **English, Uzbek and Korean**.
*Sillage* (French, n.m.): the trace left behind by something that moves.

Fifteen silhouettes sit on a wall of lit shelves. Select one and the camera zooms in on it: the shoe
flies from its shelf to the product page, where you pick a size and add it to the bag.
It is a concept, so there is no real checkout.

**Live demo:** https://mipuxen.github.io/maison-sillage/

![Maison Sillage](public/og-image.jpg)

## Features

- **Collection wall** (5 x 2) with hover glow, labels and keyboard focus states
- **Camera zoom** between collection and product (FLIP technique, Web Animations API, no animation library)
- **Product page**: brand, colour, price, description, photo gallery, EU size select with validation, details
- **Bag drawer**: add, change quantity (1 to 9), remove, subtotal, saved in `localStorage`
- **Three languages**: EN / UZ / KO switch in the header, saved per visitor, browser language detected
  on the first visit, `<html lang>` and page titles follow the language
- **About** page with the store concept and the developer card
- **Contact** page with a validated demo form (nothing is sent; there is no backend)
- **Responsive**: inline navigation on desktop, full-screen menu on phones
- **Accessible**: native `<dialog>` menu, focus trap in the bag, skip link, ARIA labels,
  `prefers-reduced-motion` support
- **Keyboard**: `Esc` back to the collection, `←` `→` browse silhouettes
- **Hash routing**: `#/`, `#/nike-cortez`, `#/about`, `#/contact`. Back/Forward and direct links work
- Runtime dependencies: only `react`, `react-dom` and two self-hosted fonts

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit tests: bag logic, translations, form validation
npm run build      # production build in dist/
npm run preview    # serve the production build at http://localhost:4173
```

Requires Node.js 18 or newer.

## Photos and products

Each product has a folder `public/shoes/<slug>/` with numbered photos: `1.webp` is the one on the wall
(a side view works best), `2.webp`, `3.webp` ... appear in the product gallery. Products are listed in
`src/data/products.js`; `images` is how many photos the folder holds. `npm test` fails if a photo is missing.

To add or replace a shoe:

1. Use a photo with a **transparent background** (WebP or PNG), about 2400 px wide.
2. Save it as `public/shoes/<slug>/1.webp` (more angles as `2.webp`, `3.webp` ...).
3. Add an entry to `src/data/products.js` (brand, name, price, colour, description and materials in 3 languages).

## Translations

- Interface text: `src/i18n/en.js`, `uz.js`, `ko.js` (same keys in each file)
- Product text (colour, description, materials): `src/data/products.js`, stored as `{ en, uz, ko }`
- `npm test` fails if a key, a product translation or a `{placeholder}` is missing in any language

To add a language: copy `en.js`, translate it, register it in `src/i18n/index.js`, add the product
fields, and run `npm test`.

## Project structure

```
src/
  main.jsx              entry: fonts, styles, providers
  App.jsx               layout shell, routes, keyboard shortcuts, page transitions
  data/products.js      the collection (single source of truth)
  i18n/                 dictionaries, helpers, React context, tests
  state/                bag reducer (pure, tested) + React context + localStorage
  lib/                  hash router, FLIP animation, price format, form validation
  views/                CollectionView, ProductView, AboutView, ContactView
  components/           Header, MobileMenu, LangSwitch, Footer, BagDrawer, ShoeImage, ...
  styles/               base, layout, collection, product, pages, bag
public/shoes/           product photos, one folder per product
docs/IMAGE_PROMPTS.md   prompts for generating the product photos
```

## Deploy to GitHub Pages

The workflow in `.github/workflows/deploy.yml` tests, builds and publishes on every push to `main`.

```bash
git init
git add .
git commit -m "Maison Sillage: first version"
git branch -M main
git remote add origin https://github.com/mipuxen/maison-sillage.git
git push -u origin main
```

Then in the repository: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
The site appears at `https://mipuxen.github.io/maison-sillage/` after the first run (Actions tab).

The build uses a relative base path and hash routing, so it works under any repository name.
If you choose another name, update the two `og:` URLs in `index.html`.

## Credits

Product photos and trademarks (Nike, New Balance, Lacoste, ASICS, Descente, Everlast, Slazenger) belong to
their respective owners. They are used here only for non-commercial study; this project is not affiliated
with any of these brands. Prices are fictional. The MIT license covers the code, not the product photos.

## Notes

- The code, copy and the Maison Sillage name are original. The idea of a lit shelf wall with a zoom into
  each product was inspired by a design concept; no code or branding was copied.
- Names, prices and products are fictional. Checkout is intentionally unavailable.

## Author

**Khoshimov Shukhratbek**, AI Agentic Software Engineer · [github.com/mipuxen](https://github.com/mipuxen)

Released under the [MIT License](LICENSE).
