/* Home page — inset hero, who it's for, how it works, pricing, quiz, about, itinerary preview, contact */
const { useState } = React;

/* The hero video is a fixed 16:9 clip with its headline baked into the
   footage, so it must never be cropped. .hx-media-box wraps the video and
   its dark .hx-scrim overlay together, and this hook measures the frame and
   sizes that box to the largest 16:9 rectangle that fits inside it — the
   same math object-fit: contain uses, just applied to a plain box instead of
   the video alone, so the scrim darkens only the video's actual picture and
   never spills into the letterbox bars around it. Those bars are then just
   .hx-frame's own plain canvas background showing through, matching the
   section below the hero instead of reading as a tinted edge. */
function useContainedMediaSize(frameRef) {
  const [size, setSize] = React.useState(null);
  React.useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const RATIO = 16 / 9;
    const update = () => {
      const w = el.clientWidth, h = el.clientHeight;
      if (!w || !h) return;
      let mw = w, mh = w / RATIO;
      if (mh > h) { mh = h; mw = h * RATIO; }
      setSize({ width: Math.round(mw), height: Math.round(mh) });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [frameRef]);
  return size;
}

function HomeHero({ onStart }) {
  const frameRef = React.useRef(null);
  const mediaSize = useContainedMediaSize(frameRef);
  return (
    <section className="hx">
      <div className="hx-frame hx-frame--sky reveal" ref={frameRef}>
        <div className="hx-media-box" style={mediaSize ? { width: mediaSize.width, height: mediaSize.height } : undefined}>
          <video className="hx-video" autoPlay muted loop playsInline src="assets/hero-video.mp4"></video>
          <div className="hx-scrim hx-scrim--photo" />
        </div>
        <div className="hx-inner hx-inner--sky"></div>
      </div>
    </section>
  );
}

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "statementFontSize": 24
}/*EDITMODE-END*/;

function WhoItsFor({ statementFontSize }) {
  const cards = [
    { icon: 'sunrise', title: 'You know there is more to life than your current routine.' },
    { icon: 'leaf', title: 'Your current environment is not helping you move forward with what you are going through \u2014 let it be grief, breakup, career change or any life transition.' },
    { icon: 'moon', title: 'You could use a trip that is only about You, and what You need \u2014 without having to constantly adjust to others.' },
  ];
  const whyCards = [
    { icon: 'compass', text: 'I have been there \u2014 I can relate to how you feel mentally, and have been to where you want to go physically. I can now use all my experience to make sure your solo trip will be safe, smooth and completely matched to your personality.' },
    { icon: 'feather', text: 'There\u2019s so much information out there \u2014 I can reduce the noise for you and take the stress off your shoulders. You can skip the overwhelming research phase and the uncertainty \u2014 all you need to do is be there.' },
    { icon: 'star', text: 'I care and want the best for you. Solo travel changed the way I see life, and I want you to experience this too. Whether it\u2019s your first time travelling alone, or if you\u2019re used to it, a solo trip planned with intention can really make a difference.' },
  ];
  return (
    <>
      <section className="gtg-who anchor" id="who">
        <div className="gtg-who-head reveal-pan">
          <h2 className="gtg-section-title gtg-who-headline">You need a solo trip if:</h2>
        </div>
        <div className="gtg-who-grid gtg-who-grid--stack">
          {cards.map((c, i) => (
            <div className={'gtg-who-card reveal gtg-float-' + (i % 2 === 0 ? 'left' : 'right')} key={c.title} style={{ transitionDelay: (i * 220) + 'ms' }}>
              <span className="gtg-who-badge"><Icon name={c.icon} size={20} stroke={1.6} /></span>
              <h3>{c.title}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="gtg-who anchor" id="why-me">
        <div className="gtg-who-head reveal-pan">
          <h2 className="gtg-section-title gtg-who-headline">Why plan with me:</h2>
        </div>
        <div className="gtg-who-grid gtg-who-grid--stack">
          {whyCards.map((c, i) => (
            <div className={'gtg-who-card reveal gtg-float-' + (i % 2 === 0 ? 'left' : 'right')} key={c.text} style={{ transitionDelay: (i * 220) + 'ms' }}>
              <span className="gtg-who-badge"><Icon name={c.icon} size={20} stroke={1.6} /></span>
              <h3>{c.text}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="gtg-who-statement">
        <div className="gtg-statement-inner reveal">
          <video className="gtg-statement-video" src="assets/who-statement-video.mp4" autoPlay muted loop playsInline style={{ width: '100%', maxWidth: 900, display: 'block', margin: '0 auto', borderRadius: 'var(--r-lg)' }}></video>
        </div>
      </section>
    </>
  );
}

function HowItWorks() {
  const steps = [
    { icon: 'quizQ', n: '01', title: 'Take the quiz for inspiration', href: '#quiz' },
    { icon: 'mail', n: '02', title: 'Choose your package', href: '#contact' },
    { icon: 'phone', n: '03', title: 'Book your consultation call', href: '#contact' },
    { icon: 'mapPin', n: '04', title: 'Enjoy your solo trip' },
  ];
  return (
    <section className="gtg-how anchor" id="how">
      <div className="gtg-how-head reveal">
        <h2 className="gtg-section-title">How it works</h2>
      </div>
      <div className="gtg-how-grid gtg-how-grid--stack">
        {steps.map((s, i) => (
          <div className="gtg-step reveal" style={{ transitionDelay: (i * 140) + 'ms' }} key={s.n}>
            {s.href
              ? <a className="gtg-step-icon" href={s.href} aria-label={s.title}><Icon name={s.icon} size={22} stroke={1.6} /></a>
              : <div className="gtg-step-icon"><Icon name={s.icon} size={22} stroke={1.6} /></div>}
            <span className="gtg-step-n">{s.n}</span>
            <h3 className="gtg-step-title">{s.title}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

function PtCell({ v, featured }) {
  const cls = 'gtg-pt-cell' + (featured ? ' gtg-pt-featured' : '') + (v === 'x' ? ' icon-x' : '');
  if (v === 'check') return <div className={cls}><Icon name="check" size={18} stroke={2} /></div>;
  if (v === 'x') return <div className={cls}><Icon name="x" size={16} stroke={2} /></div>;
  return <div className={cls}><span className="gtg-pt-text">{v}</span></div>;
}

function PricingSection({ onContact }) {
  const rows = [
    { label: 'Experience- and Psychology-based advice', a: 'check', b: 'check', c: 'x' },
    { label: 'Tailored to your personality, wellbeing, and budget', a: 'check', b: 'check', c: 'Some' },
    { label: 'Accommodation, transportation, and flights advice', a: 'Some', b: 'check', c: 'x' },
    { label: 'Complete day-by-day itinerary and extensive research done for you', a: 'x', b: 'check', c: 'x' },
    { label: 'Restaurants, caf\u00e9s, bars recommendations tailored to your preferences', a: 'x', b: 'check', c: 'x' },
    { label: 'Solo-female safety vetting and support calls', a: 'Some', b: 'check', c: 'x' },
    { label: 'Access to solo female traveller certified businesses and benefits', a: 'Some', b: 'check', c: 'x' },
    { label: 'Free Destination Guide', a: 'x', b: 'check', c: 'x' },
    { label: 'One round of revision', a: 'x', b: 'check', c: 'x' },
    { label: 'Your time & effort', a: 'Some', b: 'Minimal', c: 'A lot' },
  ];
  return (
    <section className="gtg-pricing anchor" id="pricing">
      <div className="gtg-pricing-head reveal">
        <span className="gtg-eyebrow">Services & pricing</span>
        <h2 className="gtg-section-title">Planning together compared to planning on your own:</h2>
        <p className="gtg-pricing-sub">Whether you only need a little help or the entire trip planned out for you, here's the packages you can choose from:</p>
      </div>
      <div className="gtg-pricing-tablewrap reveal">
        <div className="gtg-pricing-table">
          <div className="gtg-pt-row gtg-pt-head">
            <div className="gtg-pt-cell gtg-pt-label"></div>
            <div className="gtg-pt-cell">
              <span className="gtg-pt-title gtg-pt-title--full">Solo Trip Direction Package<br/></span>
              <span className="gtg-pt-title gtg-pt-title--short">Solo call</span>
              <span className="gtg-pt-sub">60-min call</span>
            </div>
            <div className="gtg-pt-cell gtg-pt-featured">
              <span className="gtg-pt-flag">Most chosen</span>
              <span className="gtg-pt-title gtg-pt-title--full">Grounding to Go<br/>full package</span>
              <span className="gtg-pt-title gtg-pt-title--short">Full package</span>
              <span className="gtg-pt-sub"></span>
            </div>
            <div className="gtg-pt-cell">
              <span className="gtg-pt-title gtg-pt-title--full">On your own</span>
              <span className="gtg-pt-title gtg-pt-title--short">DIY</span>
              <span className="gtg-pt-sub">DIY</span>
            </div>
          </div>
          {rows.map((r, i) => (
            <div className={'gtg-pt-row' + (i === rows.length - 1 ? ' gtg-pt-row--last' : '')} key={r.label}>
              <div className="gtg-pt-cell gtg-pt-label">{r.label}</div>
              <PtCell v={r.a} />
              <PtCell v={r.b} featured />
              <PtCell v={r.c} />
            </div>
          ))}
        </div>
      </div>
      <div className="gtg-pricing-cards">
        <div className="gtg-pricing-card reveal">
          <span className="gtg-eyebrow">FOUNDING RATE</span>
          <h3>Grounding to Go Full Package</h3>
          <p className="gtg-pricing-body">A complete, custom-made plan for your trip including:</p>
          <ul className="gtg-pricing-list">
            <li>A 60-minute introduction call</li>
            <li>Daily plan of restaurants, caf&eacute;s, and bars to visit (breakfast, lunch, dinner)</li>
            <li>Complete plan of daily activities</li>
            <li>Access to GroundingtoGo solo female traveller certified businesses for added safety and benefits</li>
            <li>Accommodation and neighbourhood options matched to your budget and preference</li>
            <li>Advice on transportation and flights</li>
            <li>Safety vetting</li>
          </ul>
          <p className="gtg-pricing-and">and</p>
          <p className="gtg-pricing-body">A free comprehensive guide to your destination including:</p>
          <ul className="gtg-pricing-list">
            <li>Local culture and customs</li>
            <li>Appropriate conduct</li>
            <li>What to pack</li>
            <li>Souvenir guide</li>
            <li>Most beautiful photo spots</li>
          </ul>
          <p className="gtg-pricing-addon"><strong>Optional add-on:</strong> a private printable online diary with prompts to track your experience.</p>
          <div className="gtg-pricing-price">&euro;40 <span>/ day</span></div>
          <p className="gtg-pricing-fine">The plan comes in an interactive online format and a printable PDF. Booking the flights and accommodation is not included.</p>
          <button className="gtg-pill gtg-pill--ghost-clay" onClick={onContact}>Book now</button>
        </div>
        <div className="gtg-pricing-card gtg-pricing-card--featured reveal">
          <span className="gtg-eyebrow">Founding rate</span>
          <h3>Solo Trip Direction Package</h3>
          <p className="gtg-pricing-body">Not ready to commit just yet? Or you only need a bit of guidance? The Solo Trip Direction package includes:</p>
          <ul className="gtg-pricing-list">
            <li>A 60-minute direction call</li>
            <li>A written summary of the call</li>
            <li>A private printable online diary with prompts to help you decide on your next steps</li>
          </ul>
          <div className="gtg-pricing-price">&euro;35</div>
          <p className="gtg-pricing-fine"></p>
          <p className="gtg-pricing-highlight">If you do decide to book the GTG full package afterwards, your purchase amount will be deducted from your final price.</p>
          <button className="gtg-pill" onClick={onContact}>Book now</button>
        </div>
      </div>
    </section>
  );
}

function QuizSection() {
  return (
    <section className="gtg-quizsec anchor" id="quiz">
      <div className="gtg-quiz-head reveal" style={{ maxWidth: 620, margin: '0 auto 36px' }}>
        <div className="gtg-quiz-kicker"><span className="gtg-dot" /><span className="gtg-eyebrow">Quiz</span></div>
        <h2 className="gtg-quiz-title">So where should you go?</h2>
        <p className="gtg-quiz-sub">There&rsquo;s no wrong answer and nothing to sign up for, take this quiz to find out what kind of solo trip matches your psychological wellbeing, personality, and needs the most.</p>
      </div>
      {window.Quiz ? React.createElement(window.Quiz, null) : null}
    </section>
  );
}

function AboutMe() {
  return (
    <section className="gtg-about anchor" id="about">
      <div className="gtg-about-inner">
        <div className="gtg-about-media reveal">
          <image-slot
            id="about-portrait"
            src="assets/about-portrait.webp"
            shape="rounded"
            radius="18"
            fit="cover"
            placeholder="Drop your portrait"
            style={{ display: 'block', width: '349px', height: '551px', aspectRatio: '326 / 461', boxShadow: 'var(--shadow-image)' }}
          ></image-slot>
        </div>
        <div className="gtg-about-copy reveal">
          <span className="gtg-eyebrow">About me</span>
          <h2 className="gtg-section-title">Hi, I&rsquo;m Laura.</h2>
          <p>I created Grounding<em>to</em>Go because I genuinely believe that a well-planned solo trip is one of the most powerful things a woman can do for herself. Taking time to focus entirely on you &mdash; your pace, your interests, your energy &mdash; in a new and inspiring environment has a way of shifting things that nothing else quite does. I&rsquo;ve experienced it myself, and I want more women to have access to it.</p>
          <p>To help you get there, I draw on my BA in Hospitality, my MSc in Psychology, and 10+ years of travelling independently around the world. That combination lets me tailor your trip to your personality, your current state of mind, and your personal goals.</p>
          <p>I personally can&rsquo;t wait to work with you, and bring some positive change into the way you see your world.</p>
          <p className="gtg-about-sign">&mdash; Laura</p>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = React.useState({ name: '', email: '', style: '', destination: '', when: '', message: '' });
  const [errs, setErrs] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState('');

  React.useEffect(() => {
    try { const s = localStorage.getItem('gtg_style'); if (s) {
      const map = { coast: 'Coast', desert: 'Desert', forest: 'Forest', mountain: 'Mountains' };
      setForm((f) => ({ ...f, style: map[s] || '' }));
    } } catch (e) {}
  }, []);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    const er = {};
    if (!form.name.trim()) er.name = 'Tell us your name.';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) er.email = 'A valid email, so we can reach you.';
    if (!form.message.trim()) er.message = 'A line or two about what you need.';
    setErrs(er);
    if (Object.keys(er).length) return;
    setFailed(''); setBusy(true);
    const res = await sendEnquiry(form, 'Contact section');
    setBusy(false);
    if (res.ok) setSent(true); else setFailed(res.error);
  };

  return (
    <section className="gtg-contact anchor" id="contact">
      <div className="gtg-contact-grid">
        <aside className="gtg-contact-aside reveal">
          <span className="gtg-eyebrow">CONTACT</span>
          <h2>Take the first step here</h2>
          <p>Leave a quick message and I&rsquo;ll get back to you!</p>
          <div className="gtg-contact-list">
            <div className="gtg-contact-item">
              <span className="ic"><Icon name="mapPin" size={18} stroke={1.7} /></span>
              <div><div className="k">Email</div><a className="v" href="mailto:hello@groundingtogo.com">hello@groundingtogo.com</a></div>
            </div>
          </div>
        </aside>

        <div className="gtg-form reveal">
          {!sent ? (
            <form onSubmit={submit} noValidate>
              <div className="gtg-form-row">
                <div className="gtg-field">
                  <label htmlFor="c-name">Your name</label>
                  <input id="c-name" value={form.name} onChange={set('name')} className={errs.name ? 'err' : ''} />
                  {errs.name && <div className="errmsg">{errs.name}</div>}
                </div>
                <div className="gtg-field">
                  <label htmlFor="c-email">Email</label>
                  <input id="c-email" type="email" value={form.email} onChange={set('email')} className={errs.email ? 'err' : ''} />
                  {errs.email && <div className="errmsg">{errs.email}</div>}
                </div>
              </div>
              <div className="gtg-form-row">
                <div className="gtg-field">
                  <label htmlFor="c-destination">Planned destination</label>
                  <input id="c-destination" value={form.destination} onChange={set('destination')} placeholder="e.g. Lisbon" />
                </div>
                <div className="gtg-field">
                  <label htmlFor="c-when">When would you like to go?</label>
                  <input id="c-when" value={form.when} onChange={set('when')} placeholder="e.g. early autumn" />
                </div>
              </div>
              <div className="gtg-field">
                <label htmlFor="c-message">Anything else I should know?</label>
                <textarea id="c-message" value={form.message} onChange={set('message')} className={errs.message ? 'err' : ''} />
                {errs.message && <div className="errmsg">{errs.message}</div>}
              </div>
              {failed && <div className="gtg-form-error">{failed}</div>}
              <div className="gtg-form-foot">
                <p className="gtg-form-fine">No newsletter, no spam.</p>
                <button className="gtg-pill" type="submit" disabled={busy}>{busy ? 'Sending\u2026' : 'Send'} <Icon name="arrowRight" size={16} stroke={1.9} /></button>
              </div>
            </form>
          ) : (
            <div className="gtg-form-done">
              <div className="gtg-done-mark"><Icon name="check" size={26} stroke={2} /></div>
              <h3>Your note&rsquo;s with us, {form.name.split(' ')[0]}.</h3>
              <p>It has landed in my inbox and I&rsquo;ll reply within two days. Until then &mdash; go gently.</p>
              <button className="gtg-pill gtg-pill--block" style={{ maxWidth: 260, margin: '24px auto 0' }} onClick={() => { setSent(false); setFailed(''); setForm({ name: '', email: '', style: '', destination: '', when: '', message: '' }); }}>Send another</button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/* Floating "Take the Quiz" pill — fixed on screen for the entire page, so
   it's always available no matter where you've scrolled to. This is now the
   only quiz CTA on the hero (the hero's own button was removed). */
function FloatingQuizButton() {
  return (
    <a className="gtg-pill gtg-floatquiz" href="#quiz">Take the Quiz</a>
  );
}

function HomeApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [modal, setModal] = useState({ open: false, trip: null });
  const [contactOpen, setContactOpen] = useState(false);
  const start = () => setModal({ open: true, trip: null });
  const openContact = () => setContactOpen(true);
  useReveal();
  return (
    <>
      <GlobalNav active="home" onStart={start} onContact={openContact} />
      <HomeHero onStart={start} />
      <FloatingQuizButton />
      <WhoItsFor statementFontSize={t.statementFontSize} />
      <HowItWorks />
      <PricingSection onContact={openContact} />
      <QuizSection />
      <AboutMe />
      <ContactSection />
      <Footer onStart={start} />
      <ResetModal open={modal.open} trip={modal.trip} onClose={() => setModal({ open: false, trip: null })} />
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
      <TweaksPanel>
        <TweakSection label="Who it's for" />
        <TweakSlider label="Statement font size" value={t.statementFontSize} min={14} max={40} unit="px" onChange={(v) => setTweak('statementFontSize', v)} />
      </TweaksPanel>
    </>
  );
}
ReactDOM.createRoot(document.getElementById('root')).render(<HomeApp />);
