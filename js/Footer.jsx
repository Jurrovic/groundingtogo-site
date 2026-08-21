/* Closing CTA band + dense footer (real multi-page links) */
function Footer({ onStart, closer = true }) {
  const cols = [
    { h: 'From the blog', links: [
        { t: 'Your first solo trip', h: 'blog.html#first-solo-trip' },
        { t: 'All articles', h: 'blog.html' },
      ] },
    { h: 'Grounding to Go', links: [
        { t: 'Take the quiz', h: 'index.html#quiz' },
        { t: 'How it works', h: 'index.html#how' },
      ] },
    { h: 'Company', links: [
        { t: 'About me', h: 'index.html#about' },
        { t: 'Contact', h: 'index.html#contact' },
        { t: 'Book a call', h: 'index.html#contact' },
      ] },
    { h: 'Support', links: [
        { t: 'Book a call', h: 'index.html#contact' },
        { t: 'Privacy', h: 'index.html#contact' },
        { t: 'Terms', h: 'index.html#contact' },
      ] },
  ];
  return (
    <>
      {closer && (
        <section className="gtg-closer">
          <span className="gtg-eyebrow">Ready when you are</span>
          <h2 className="gtg-closer-title">Go alone.<br />Come back whole.</h2>
          <p className="gtg-closer-sub">Request your custom solo travel itinerary today</p>
          <a className="gtg-pill" href="index.html#quiz">Take the Quiz</a>
        </section>
      )}
      <footer className="gtg-footer">
        <div className="gtg-footer-cols">
          <div className="gtg-footer-brandcol">
            <a className="gtg-brand gtg-brand--ink" href="index.html"><span className="gtg-dot" /><span className="gtg-wordmark">Grounding<em>to</em>Go</span></a>
            <p className="gtg-footer-sign">by Laura Litauszki</p>
            <div className="gtg-footer-social">
              <a className="gtg-footer-social-btn" href="https://www.tiktok.com/@groundingtogo" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <span className="gtg-tiktok-badge gtg-tiktok-badge--footer">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12V9.69a5.7 5.7 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V8.83a7.34 7.34 0 0 0 4.29 1.38V7.12a4.28 4.28 0 0 1-3.29-1.3Z"></path>
                  </svg>
                </span>
              </a>
              <a className="gtg-footer-social-btn" href="https://www.instagram.com/groundingtogo?igsh=dTk1enR3YXMzcjZj" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <Icon name="instagram" size={22} stroke={1.8} />
              </a>
            </div>
          </div>
          {cols.map((c) => (
            <nav className="gtg-footer-col" key={c.h}>
              <h4 className="gtg-footer-h">{c.h}</h4>
              {c.links.map((l) => <a key={l.t} href={l.h}>{l.t}</a>)}
            </nav>
          ))}
        </div>
        <div className="gtg-footer-legal">
          <span>{'\u00a9 2026 GroundingtoGo. Personalised solo travel planning for women who want to travel alone \u2014 but aren\u2019t sure where to go, what to expect, or how to start.'}</span>
          <span>{'Privacy \u00b7 Terms \u00b7 Cookies'}</span>
        </div>
      </footer>
    </>
  );
}
window.Footer = Footer;
