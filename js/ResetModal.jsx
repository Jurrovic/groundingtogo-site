/* ResetModal — quiet two-step "start your reset" flow */
function ResetModal({ open, onClose, trip, presetPlace }) {
  const [step, setStep] = React.useState(0);
  const [place, setPlace] = React.useState('Coast');
  const [pace, setPace] = React.useState('Slow');

  React.useEffect(() => {
    if (open) { setStep(0); setPlace(trip ? trip.category : (presetPlace || 'Coast')); }
  }, [open, trip, presetPlace]);

  React.useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const places = ['Coast', 'Desert', 'Forest', 'Mountains'];
  const paces = ['Slow', 'Slower', 'Barely moving'];

  return (
    <div className="gtg-modal-scrim" onClick={onClose}>
      <div className="gtg-modal" onClick={(e) => e.stopPropagation()}>
        <button className="gtg-modal-close" onClick={onClose} aria-label="Close"><Icon name="x" size={18} /></button>

        {step === 0 && (
          <div className="gtg-modal-body">
            <span className="gtg-eyebrow">Start your reset</span>
            <h2 className="gtg-modal-title">Where could you land?</h2>
            <p className="gtg-modal-sub">No commitment yet. Just a feel for the kind of quiet you need.</p>

            <p className="gtg-field-label">A place</p>
            <div className="gtg-chiprow">
              {places.map((p) => (
                <button key={p} className={'gtg-chip' + (place === p ? ' gtg-chip--sel' : '')} onClick={() => setPlace(p)}>{p}</button>
              ))}
            </div>

            <p className="gtg-field-label">A pace</p>
            <div className="gtg-chiprow">
              {paces.map((p) => (
                <button key={p} className={'gtg-chip' + (pace === p ? ' gtg-chip--sel' : '')} onClick={() => setPace(p)}>{p}</button>
              ))}
            </div>

            <button className="gtg-pill gtg-pill--block" onClick={() => setStep(1)}>Continue</button>
          </div>
        )}

        {step === 1 && (
          <div className="gtg-modal-body">
            <span className="gtg-eyebrow">One last thing</span>
            <h2 className="gtg-modal-title">We&rsquo;ll plan it on one call.</h2>
            <p className="gtg-modal-sub">Leave your email and a planner will reach out to shape your {place.toLowerCase()} reset &mdash; {pace.toLowerCase()} pace.</p>
            <div className="gtg-input">
              <input placeholder="you@email.com" type="email" />
            </div>
            <button className="gtg-pill gtg-pill--block" onClick={() => setStep(2)}>Request your call</button>
            <button className="gtg-textlink gtg-modal-back" onClick={() => setStep(0)}>Back</button>
          </div>
        )}

        {step === 2 && (
          <div className="gtg-modal-body gtg-modal-done">
            <div className="gtg-done-mark"><Icon name="check" size={26} stroke={2} /></div>
            <h2 className="gtg-modal-title">You&rsquo;re on the list.</h2>
            <p className="gtg-modal-sub">A planner will be in touch within two days. Until then &mdash; go gently.</p>
            <button className="gtg-pill gtg-pill--block" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}
window.ResetModal = ResetModal;
