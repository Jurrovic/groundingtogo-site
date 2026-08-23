#!/usr/bin/env node
/*
 * Generates a real, static, crawlable HTML page for every blog post, at
 * blog/<id>/index.html — full article text baked into the HTML (not
 * rendered by JavaScript), with its own <title>, meta description,
 * canonical URL, Open Graph tags and Article JSON-LD.
 *
 * Why this exists: the site itself is a client-side React app (loaded via
 * plain <script> tags, transpiled by Babel in the browser — there's no
 * build step). That's fine for people, who wait a moment for it to render,
 * but search engines and AI crawlers largely don't execute that JavaScript,
 * so they were never seeing the actual article text — only an empty shell.
 * These generated pages are real files GitHub Pages serves directly, so a
 * crawler (or a person) hitting /blog/<id>/ gets the full content in the
 * very first response, no JavaScript required.
 *
 * The blog listing (blog.html) still opens posts in the nice in-page
 * overlay for visitors with JavaScript — these pages are what crawlers,
 * shared links, and direct visits land on, and they use the exact same
 * CSS classes as the in-page reader, so they look the same as the rest of
 * the site.
 *
 * HOW TO RE-RUN THIS:
 * Whenever a blog post is added, edited, or removed in js/blog-posts.js,
 * re-run this script (`node generate-blog-pages.js` from the repo root) to
 * regenerate blog/<id>/index.html and sitemap.xml to match. If you're
 * asking Claude to add a new post, ask it to also re-run this script.
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE_URL = 'https://groundingtogo.com';
const POSTS = require(path.join(ROOT, 'js', 'blog-posts.js'));

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return escapeHtml(str);
}

// 'DD.MM.YYYY' -> 'YYYY-MM-DD'
function toIsoDate(d) {
  const m = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(d);
  if (!m) return d;
  return `${m[3]}-${m[2]}-${m[1]}`;
}

function truncate(str, max) {
  if (str.length <= max) return str;
  const cut = str.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(' ');
  return (lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trim() + '…';
}

function renderBody(body) {
  return body.map((b) => {
    if (typeof b === 'string') return `<p class="gtg-reader-p">${escapeHtml(b)}</p>`;
    if (b.h) return `<h2 class="gtg-reader-h">${escapeHtml(b.h)}</h2>`;
    if (b.ul) {
      const items = b.ul.map((li) => `<li>${escapeHtml(li)}</li>`).join('\n          ');
      return `<ul class="gtg-reader-ul">\n          ${items}\n        </ul>`;
    }
    return `<p class="gtg-reader-p">${escapeHtml(b.p)}</p>`;
  }).join('\n        ');
}

function jsonLd(post, url, metaDescription) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: `${SITE_URL}/${post.image}`,
    datePublished: toIsoDate(post.date),
    dateModified: toIsoDate(post.date),
    author: {
      '@type': 'Person',
      name: 'Laura Litauszki',
      url: `${SITE_URL}/index.html#about`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'GroundingtoGo',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/assets/logo-mark.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    keywords: (post.keywords || []).join(', '),
  };
  // JSON inside a <script> tag: escape '<' so a literal "</script" in data
  // (none expected here, but cheap insurance) can't break out of the tag.
  return JSON.stringify(data, null, 2).replace(/</g, '\\u003c');
}

const TIKTOK_SVG = '<svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12V9.69a5.7 5.7 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V8.83a7.34 7.34 0 0 0 4.29 1.38V7.12a4.28 4.28 0 0 1-3.29-1.3Z"></path></svg>';
const IG_SVG = '<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
const IG_SVG_FOOTER = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>';
const MENU_SVG = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>';
const ARROW_SVG = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';

const NAV_LINKS = [
  { href: '/index.html', label: 'Home' },
  { href: '/index.html#how', label: 'How it works' },
  { href: '/blog.html', label: 'Blog', active: true },
  { href: '/index.html#about', label: 'About' },
  { href: '/index.html#contact', label: 'Contact' },
];

function renderNav() {
  const links = NAV_LINKS.map((l) => `<a href="${l.href}"${l.active ? ' class="is-active"' : ''}>${l.label}</a>`).join('\n          ');
  const mobileLinks = NAV_LINKS.map((l) => `<a href="${l.href}"${l.active ? ' class="is-active"' : ''}>${l.label}</a>`).join('\n        ');
  return `<header class="gtg-nav-wrap">
    <nav class="gtg-globalnav">
      <a class="gtg-brand" href="/index.html">
        <span class="gtg-dot"></span>
        <span class="gtg-wordmark">Grounding<em>to</em>Go</span>
      </a>
      <div class="gtg-nav-links">
        ${links}
      </div>
      <div class="gtg-nav-right">
        <a class="gtg-iconbtn" href="https://www.tiktok.com/@groundingtogo" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
          <span class="gtg-tiktok-badge">${TIKTOK_SVG}</span>
        </a>
        <a class="gtg-iconbtn" href="https://www.instagram.com/groundingtogo?igsh=dTk1enR3YXMzcjZj" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${IG_SVG}</a>
        <a class="gtg-pill gtg-pill--nav" href="/index.html#contact">Get in touch</a>
        <button class="gtg-navtoggle" aria-label="Menu" onclick="document.getElementById('gtg-mm').classList.toggle('gtg-open')">${MENU_SVG}</button>
      </div>
    </nav>
    <div class="gtg-mobile-menu" id="gtg-mm">
      ${mobileLinks}
      <a class="gtg-pill" href="/index.html#contact">Get in touch</a>
    </div>
  </header>`;
}

function renderFooter() {
  return `<section class="gtg-closer">
    <span class="gtg-eyebrow">Ready when you are</span>
    <h2 class="gtg-closer-title">Go alone.<br>Come back whole.</h2>
    <p class="gtg-closer-sub">Request your custom solo travel itinerary today</p>
    <a class="gtg-pill" href="/index.html#quiz">Take the Quiz</a>
  </section>
  <footer class="gtg-footer">
    <div class="gtg-footer-cols">
      <div class="gtg-footer-brandcol">
        <a class="gtg-brand gtg-brand--ink" href="/index.html"><span class="gtg-dot"></span><span class="gtg-wordmark">Grounding<em>to</em>Go</span></a>
        <p class="gtg-footer-sign">by Laura Litauszki</p>
        <div class="gtg-footer-social">
          <a class="gtg-footer-social-btn" href="https://www.tiktok.com/@groundingtogo" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <span class="gtg-tiktok-badge gtg-tiktok-badge--footer">${TIKTOK_SVG}</span>
          </a>
          <a class="gtg-footer-social-btn" href="https://www.instagram.com/groundingtogo?igsh=dTk1enR3YXMzcjZj" target="_blank" rel="noopener noreferrer" aria-label="Instagram">${IG_SVG_FOOTER}</a>
        </div>
      </div>
      <nav class="gtg-footer-col">
        <h4 class="gtg-footer-h">From the blog</h4>
        <a href="/blog/first-solo-trip/">Your first solo trip</a>
        <a href="/blog.html">All articles</a>
      </nav>
      <nav class="gtg-footer-col">
        <h4 class="gtg-footer-h">Grounding to Go</h4>
        <a href="/index.html#quiz">Take the quiz</a>
        <a href="/index.html#how">How it works</a>
      </nav>
      <nav class="gtg-footer-col">
        <h4 class="gtg-footer-h">Company</h4>
        <a href="/index.html#about">About me</a>
        <a href="/index.html#contact">Contact</a>
      </nav>
      <nav class="gtg-footer-col">
        <h4 class="gtg-footer-h">Support</h4>
        <a href="/privacy.html">Privacy</a>
      </nav>
    </div>
    <div class="gtg-footer-legal">
      <span>&copy; 2026 GroundingtoGo. Personalised solo travel planning for women who want to travel alone — but aren’t sure where to go, what to expect, or how to start.</span>
      <span><a href="/privacy.html" style="color:inherit;text-decoration:underline">Privacy</a> · Terms · Cookies</span>
    </div>
  </footer>`;
}

function renderPage(post) {
  const url = `${SITE_URL}/blog/${post.id}/`;
  const metaDescription = escapeAttr(truncate(post.excerpt, 155));
  const keywords = (post.keywords || []).join(', ');
  const title = `${post.title} — GroundingtoGo`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${metaDescription}">
${keywords ? `<meta name="keywords" content="${escapeAttr(keywords)}">\n` : ''}<link rel="canonical" href="${url}">
<link rel="icon" href="/assets/logo-mark.svg">
<meta property="og:type" content="article">
<meta property="og:title" content="${escapeAttr(post.title)}">
<meta property="og:description" content="${metaDescription}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE_URL}/${post.image}">
<meta property="og:site_name" content="GroundingtoGo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeAttr(post.title)}">
<meta name="twitter:description" content="${metaDescription}">
<meta name="twitter:image" content="${SITE_URL}/${post.image}">
<link rel="stylesheet" href="/css/colors_and_type.css">
<link rel="stylesheet" href="/css/kit.css">
<link rel="stylesheet" href="/css/app.css">
<script type="application/ld+json">
${jsonLd(post, url, metaDescription)}
</script>
<style>
  /* This page is plain static HTML (no React) so its mobile nav menu is
     toggled with a few lines of vanilla JS instead — this just gives the
     menu a hidden/shown state to toggle between. */
  .gtg-mobile-menu { display: none; }
  .gtg-mobile-menu.gtg-open { display: flex !important; }
</style>
</head>
<body>
${renderNav()}

<div style="padding-top: clamp(24px, 4vw, 40px)">
  <div class="gtg-reader-photo" style="max-width: 780px; margin: 0 auto; border-radius: var(--r-lg); overflow: hidden; box-shadow: var(--shadow-image);">
    <img class="gtg-reader-img" src="/${post.image}" alt="${escapeAttr(post.title)}">
  </div>
  <article class="gtg-reader-body">
    <span class="gtg-eyebrow">Blog</span>
    <h1 class="gtg-reader-title">${escapeHtml(post.title)}</h1>
    <div class="gtg-blog-meta gtg-reader-meta">${escapeHtml(post.date)}<span class="gtg-blog-dotsep"></span>${escapeHtml(post.read)}</div>
        ${renderBody(post.body)}
    <div class="gtg-reader-cta">
      <a class="gtg-pill" href="/index.html#quiz">Take the Quiz ${ARROW_SVG}</a>
    </div>
    <p style="margin-top:28px"><a href="/blog.html">← Back to all posts</a></p>
  </article>
</div>

${renderFooter()}
</body>
</html>
`;
}

// --- Generate one page per post ---
const blogDir = path.join(ROOT, 'blog');
if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

const written = [];
for (const post of POSTS) {
  const dir = path.join(blogDir, post.id);
  fs.mkdirSync(dir, { recursive: true });
  const outPath = path.join(dir, 'index.html');
  fs.writeFileSync(outPath, renderPage(post), 'utf8');
  written.push({ id: post.id, path: path.relative(ROOT, outPath), bytes: Buffer.byteLength(renderPage(post)) });
}

console.log(`Generated ${written.length} static blog page(s):`);
written.forEach((w) => console.log(`  - ${w.path} (${w.bytes} bytes)`));

// --- Also (re)generate sitemap.xml so it always matches the current posts ---
const STATIC_PAGES = [
  { loc: `${SITE_URL}/`, changefreq: 'monthly', priority: '1.0' },
  { loc: `${SITE_URL}/blog.html`, changefreq: 'weekly', priority: '0.8' },
  { loc: `${SITE_URL}/travel-styles.html`, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE_URL}/privacy.html`, changefreq: 'yearly', priority: '0.3' },
];

const urlEntries = [
  ...STATIC_PAGES.map((p) => `  <url>\n    <loc>${p.loc}</loc>\n    <changefreq>${p.changefreq}</changefreq>\n    <priority>${p.priority}</priority>\n  </url>`),
  ...POSTS.map((post) => `  <url>\n    <loc>${SITE_URL}/blog/${post.id}/</loc>\n    <lastmod>${toIsoDate(post.date)}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`),
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries.join('\n')}
</urlset>
`;

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), sitemap, 'utf8');
console.log(`\nWrote sitemap.xml with ${STATIC_PAGES.length + POSTS.length} URLs.`);
