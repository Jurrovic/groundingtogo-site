/* GlobalNav — slim true-black bar, persists across all pages. */
function GlobalNav({ active, onStart, onContact }) {
  const [open, setOpen] = React.useState(false);
  const links = [
    { id: 'home', label: 'Home', href: 'index.html' },
    { id: 'blog', label: 'Blog', href: 'blog.html' },
    { id: 'about', label: 'About', href: 'index.html#about' },
    { id: 'contact', label: 'Contact', href: 'index.html#contact' },
  ];
  return (
    <header className="gtg-nav-wrap">
      <nav className="gtg-globalnav">
        <a className="gtg-brand" href="index.html">
          <span className="gtg-dot" />
          <span className="gtg-wordmark">Grounding<em>to</em>Go</span>
        </a>
        <div className="gtg-nav-links">
          {links.map((l) => (
            <a key={l.id} href={l.href} className={active === l.id ? 'is-active' : ''}>{l.label}</a>
          ))}
        </div>
        <div className="gtg-nav-right">
          <a className="gtg-iconbtn" href="https://www.tiktok.com/@groundingtogo" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
            <span className="gtg-tiktok-badge">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16.6 5.82A4.28 4.28 0 0 1 15.54 3h-3.09v12.4a2.59 2.59 0 0 1-2.59 2.5 2.59 2.59 0 0 1 0-5.18c.27 0 .53.04.77.12V9.69a5.7 5.7 0 0 0-.77-.05 5.68 5.68 0 1 0 5.68 5.68V8.83a7.34 7.34 0 0 0 4.29 1.38V7.12a4.28 4.28 0 0 1-3.29-1.3Z"></path>
              </svg>
            </span>
          </a>
          <a className="gtg-iconbtn" href="https://www.instagram.com/groundingtogo?igsh=dTk1enR3YXMzcjZj" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Icon name="instagram" size={19} stroke={1.8} />
          </a>
          <button className="gtg-pill gtg-pill--nav" onClick={onContact}>Get in touch</button>
          <button className="gtg-navtoggle" aria-label="Menu" onClick={() => setOpen((o) => !o)}>
            <Icon name={open ? 'x' : 'menu'} size={20} stroke={1.8} />
          </button>
        </div>
      </nav>
      {open && (
        <div className="gtg-mobile-menu">
          {links.map((l) => (
            <a key={l.id} href={l.href} className={active === l.id ? 'is-active' : ''}>{l.label}</a>
          ))}
          <button className="gtg-pill" onClick={() => { setOpen(false); onContact && onContact(); }}>Get in touch</button>
        </div>
      )}
    </header>
  );
}
window.GlobalNav = GlobalNav;
