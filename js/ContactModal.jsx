/* ContactModal — quick pop-up: email note or WhatsApp, no full-page form */
function ContactModal({ open, onClose }) {
  const [form, setForm] = React.useState({ name: '', email: '', message: '' });
  const [errs, setErrs] = React.useState({});
  const [sent, setSent] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState('');

  const EMAIL = 'hello@groundingtogo.com';
  const WHATSAPP = '15551234567'; // digits only, country code first

  React.useEffect(() => {
    if (open) { setSent(false); setBusy(false); setFailed(''); setErrs({}); setForm({ name: '', email: '', message: '' }); }
  }, [open]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

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
    const res = await sendEnquiry(form, 'Get in touch pop-up');
    setBusy(false);
    if (res.ok) setSent(true); else setFailed(res.error);
  };

  const whatsapp = () => {
    const text = encodeURIComponent("Hi — I'd love to talk about planning a reset.");
    window.open(`https://wa.me/${WHATSAPP}?text=${text}`, '_blank', 'noopener');
  };

  return (
    <div className="gtg-modal-scrim" onClick={onClose}>
      <div className="gtg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gtg-modal-close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>

        {!sent ? (
          <div className="gtg-modal-body">
            <span className="gtg-eyebrow">Get in touch with</span>
            <h2 className="gtg-modal-title"><span className="gtg-wordmark">Grounding<em>to</em>Go</span></h2>
            <p className="gtg-modal-sub">Send me a message and I will reply as soon as I can!</p>

            <form onSubmit={submit} noValidate>
              <div className="gtg-field">
                <label htmlFor="cm-name">Your name</label>
                <input id="cm-name" value={form.name} onChange={set('name')} className={errs.name ? 'err' : ''} placeholder="First name" />
                {errs.name && <div className="errmsg">{errs.name}</div>}
              </div>
              <div className="gtg-field">
                <label htmlFor="cm-email">Email</label>
                <input id="cm-email" type="email" value={form.email} onChange={set('email')} className={errs.email ? 'err' : ''} placeholder="you@email.com" />
                {errs.email && <div className="errmsg">{errs.email}</div>}
              </div>
              <div className="gtg-field">
                <label htmlFor="cm-message">Your message</label>
                <textarea id="cm-message" value={form.message} onChange={set('message')} className={errs.message ? 'err' : ''} placeholder="A line or two is plenty." />
                {errs.message && <div className="errmsg">{errs.message}</div>}
              </div>
              {failed && <div className="gtg-form-error">{failed}</div>}
              <button className="gtg-pill gtg-pill--block" type="submit" disabled={busy}>
                <Icon name="mail" size={16} stroke={1.9} /> {busy ? 'Sending\u2026' : 'Send email'}
              </button>
            </form>
          </div>
        ) : (
          <div className="gtg-modal-body gtg-modal-done">
            <div className="gtg-done-mark"><Icon name="check" size={26} stroke={2} /></div>
            <h2 className="gtg-modal-title">Your note is on its way.</h2>
            <p className="gtg-modal-sub">It has landed in my inbox and I&rsquo;ll reply within two days.</p>
            <button className="gtg-pill gtg-pill--block" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
window.ContactModal = ContactModal;
