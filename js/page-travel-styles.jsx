/* Your travel style — the four archetypes, alternating split bands */
function StyleApp() {
  const [modal, setModal] = React.useState(false);
  const [contactOpen, setContactOpen] = React.useState(false);
  useReveal();

  React.useEffect(() => {
    // highlight the band linked from the quiz result
    const id = (location.hash || '').replace('#', '');
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView ? window.scrollTo({ top: el.offsetTop - 56, behavior: 'smooth' }) : null;
          el.classList.add('flash');
        }, 200);
      }
    }
  }, []);

  return (
    <>
      <GlobalNav active="style" onStart={() => setModal(true)} onContact={() => setContactOpen(true)} />

      <section className="gtg-style-intro">
        <div className="center-narrow reveal">
          <span className="gtg-eyebrow">Your travel style</span>
          <h1 className="gtg-pagehero-title" style={{ marginTop: 14 }}>Four ways to come<br />back to yourself.</h1>
          <p>Everyone resets differently. Some need open water, some need empty desert, some need the cover of trees or the clarity of high air. Take the <a className="gtg-textlink" href="index.html#quiz">quiz</a> to find yours &mdash; or read through and feel which one is already calling.</p>
        </div>
      </section>

      {GTG_STYLES.map((st, idx) => (
        <section className={'gtg-styleband anchor ' + (idx % 2 === 1 ? 'gtg-style--dark' : (idx === 2 ? 'gtg-style--sand' : ''))} id={st.id} key={st.id}>
          <div className={'gtg-style-split' + (idx % 2 === 1 ? ' flip' : '')}>
            <div className="gtg-style-copy reveal">
              <span className="gtg-style-no">0{idx + 1} &mdash; Travel style</span>
              <h2 className="gtg-style-name">{st.name}</h2>
              <p className="gtg-style-tag">{st.tag}</p>
              <p className="gtg-style-body">{st.body}</p>
              <div className="gtg-style-traits">
                {st.traits.map((t) => <span className="gtg-trait" key={t}>{t}</span>)}
              </div>
              <div className="gtg-style-meta">
                <div><div className="k">Pace</div><div className="v">{st.pace}</div></div>
                <div><div className="k">Typical stay</div><div className="v">{st.nights}</div></div>
                <div><div className="k">Where</div><div className="v">{st.place}</div></div>
              </div>
              <div className="gtg-style-actions">
                <a className="gtg-pill" href={'index.html#contact'}>Plan this reset <Icon name="arrowRight" size={16} stroke={1.9} /></a>
              </div>
            </div>
            <div className="gtg-style-media reveal">
              <Photo mood={st.mood} style={{ position: 'absolute', inset: 0, borderRadius: 0 }} />
            </div>
          </div>
        </section>
      ))}

      <Footer onStart={() => setModal(true)} />
      <ResetModal open={modal} onClose={() => setModal(false)} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<StyleApp />);
