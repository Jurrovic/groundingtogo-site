# GroundingtoGo — static website

Production static site. No build step: open `index.html` or push the folder to GitHub Pages.

## Pages
| File | Page | Sections / anchors |
|---|---|---|
| `index.html` | Home | hero, how it works, who it's for, trips, `#quiz`, pricing, `#about`, testimonials, `#contact` |
| `blog.html` | Blog | four articles + in-page reader view |
| `travel-styles.html` | Your travel style | `#coast`, `#desert`, `#forest`, `#mountain` |
| `404.html` | Not found | GitHub Pages serves this automatically |

## Structure
```
site/
├── index.html            home
├── blog.html             blog
├── travel-styles.html    travel-style archetypes
├── 404.html
├── .nojekyll             serve files as-is on GitHub Pages
├── css/
│   ├── colors_and_type.css   design tokens + type (loads Google Fonts)
│   ├── kit.css               UI kit primitives
│   └── app.css               page/section styles
├── js/
│   ├── Icons.jsx  Photo.jsx  data.jsx
│   ├── Nav.jsx  Footer.jsx
│   ├── ResetModal.jsx  ContactModal.jsx  enquiry.jsx  airtable.jsx
│   ├── Quiz.jsx
│   ├── tweaks-panel.jsx      inert outside the design tool
│   ├── image-slot.js
│   ├── page-home.jsx
│   ├── page-blog.jsx
│   └── page-travel-styles.jsx
└── assets/               images, videos, logo, about portrait
```

## Deploy to GitHub Pages
1. Create a repo and push the **contents of this folder** to the repo root (or to `/docs`).
2. Repo → Settings → Pages → Source: *Deploy from a branch* → `main` / root (or `/docs`).
3. Done — `https://<user>.github.io/<repo>/`.

## Notes
- React, ReactDOM and Babel load from the unpkg CDN; the JSX files are transpiled in the browser, so there is nothing to compile. If you later want a build step, run the `js/*.jsx` files through Babel and swap the `type="text/babel"` script tags for plain `<script src>`.
- Fonts come from Google Fonts via `@import` in `css/colors_and_type.css`.
- The About portrait is a real file (`assets/about-portrait.webp`) referenced by `<image-slot src>` — no editor state needed.
- The enquiry form posts to Airtable; add your own key/base in `js/airtable.jsx` before going live.
