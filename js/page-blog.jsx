/* Blog — featured post on top, grid below, full article opens in-place. */

/* Post content now lives in js/blog-posts.js (loaded via a plain <script> tag
   in blog.html, before this file) so the same data can also be used by the
   Node script that generates the static /blog/<id>/ pages for crawlers.
   GTG_POSTS is already declared there as a top-level const, so it's directly
   usable here by name — no local redeclaration (that would throw a
   SyntaxError, since both files share one global classic-script scope). */

function BlogApp() {
  const [modal, setModal] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  const [reading, setReading] = React.useState(null);
  useReveal();

  // open a post if the URL carries its id (e.g. from a footer link)
  React.useEffect(() => {
    const id = (location.hash || '').replace('#', '');
    if (id) {
      const p = GTG_POSTS.find((x) => x.id === id);
      if (p) setReading(p);
    }
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = reading ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [reading]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setReading(null); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const featured = GTG_POSTS[0];
  const rest = GTG_POSTS.slice(1);

  return (
    <>
      <GlobalNav active="blog" onStart={() => setModal(true)} onContact={() => setContactOpen(true)} />

      <section className="gtg-blog-intro">
        <div className="center-narrow reveal">
          <h1 className="gtg-blog-hero-title">The Grounding<em>to</em>Go blog</h1>
          <p className="gtg-blog-hero-sub">Solo travel with intention</p>
        </div>
      </section>

      <div className="gtg-blog-wrap">
        <a className="gtg-blog-featured reveal" href={'/blog/' + featured.id + '/'} onClick={(e) => { e.preventDefault(); setReading(featured); }}>
          <div className="gtg-blog-featured-media">
            {featured.image
              ? <img className="gtg-blog-featured-img" src={featured.image} alt="" />
              : <Photo mood={featured.mood} style={{ position: 'absolute', inset: 0 }} />}
          </div>
          <div className="gtg-blog-featured-copy">
            <div className="gtg-blog-featured-head">
              <span className="gtg-blog-flag">Latest</span>
              <div className="gtg-blog-meta">{featured.date}<span className="gtg-blog-dotsep" />{featured.read}</div>
            </div>
            <h2 className="gtg-blog-featured-title">Unsure if solo travel is for you or not?<br />A Guide to Your First Solo Trip as a Woman</h2>
            <p className="gtg-blog-featured-excerpt">{featured.excerpt}</p>
            <span className="gtg-blog-readlink">Read the full piece <Icon name="arrowRight" size={16} stroke={1.9} /></span>
          </div>
        </a>

        {rest.length > 0 && (
        <>
        <div className="gtg-blog-older-head reveal">
          <span className="gtg-blog-older-label">Older</span>
          <span className="gtg-blog-older-rule" />
        </div>
        <div className="gtg-blog-grid">
          {rest.map((p) => (
            <a className="gtg-blog-card reveal" key={p.id} href={'/blog/' + p.id + '/'} onClick={(e) => { e.preventDefault(); setReading(p); }}>
              <div className={'gtg-blog-card-media' + (p.tall ? ' gtg-blog-card-media--tall' : '')}>
                {p.image
                  ? <img className={'gtg-blog-featured-img' + (p.tall ? ' gtg-blog-img--tall' : '')} src={p.image} alt="" />
                  : <Photo mood={p.mood} style={{ position: 'absolute', inset: 0 }} />}
              </div>
              <div className="gtg-blog-card-body">
                <div className="gtg-blog-meta">{p.date}<span className="gtg-blog-dotsep" />{p.read}</div>
                <h3 className="gtg-blog-card-title">{p.title}</h3>
                <p className="gtg-blog-card-excerpt">{p.excerpt}</p>
                <span className="gtg-blog-readlink">Read <Icon name="arrowRight" size={15} stroke={1.9} /></span>
              </div>
            </a>
          ))}
        </div>
        </>
        )}
      </div>

      {reading && (
        <div className="gtg-reader-overlay" onClick={() => setReading(null)}>
          <div className="gtg-reader" onClick={(e) => e.stopPropagation()}>
            <button className="gtg-reader-close" aria-label="Close" onClick={() => setReading(null)}>
              <Icon name="x" size={20} stroke={1.9} />
            </button>
            <div className="gtg-reader-photo">
              {reading.image
                ? <img className="gtg-reader-img" src={reading.image} alt="" />
                : <Photo mood={reading.mood} raised style={{ position: 'absolute', inset: 0 }} />}
            </div>
            <div className="gtg-reader-body">
              <span className="gtg-eyebrow">Blog</span>
              <h1 className="gtg-reader-title">{reading.title}</h1>
              <div className="gtg-blog-meta gtg-reader-meta">{reading.date}<span className="gtg-blog-dotsep" />{reading.read}</div>
              {reading.body.map((b, i) => {
                if (typeof b === 'string') return <p className="gtg-reader-p" key={i}>{b}</p>;
                if (b.h) return <h2 className="gtg-reader-h" key={i}>{b.h}</h2>;
                if (b.ul) return <ul className="gtg-reader-ul" key={i}>{b.ul.map((li, j) => <li key={j}>{li}</li>)}</ul>;
                return <p className="gtg-reader-p" key={i}>{b.p}</p>;
              })}
              <div className="gtg-reader-cta">
                <a className="gtg-pill" href="index.html#quiz">Take the Quiz <Icon name="arrowRight" size={16} stroke={1.9} /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer onStart={() => setModal(true)} />
      <ResetModal open={modal} onClose={() => setModal(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<BlogApp />);
