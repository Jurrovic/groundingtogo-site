/* GroundingtoGo UI kit — curated Lucide icons (ISC license), copied in.
   Thin, rounded, open line icons matching the brand's quiet tone.
   Usage: <Icon name="search" size={18} /> */
(function () {
  const P = {
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    chevronRight: '<path d="m9 18 6-6-6-6"/>',
    chevronLeft: '<path d="m15 18-6-6 6-6"/>',
    arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    menu: '<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>',
    compass: '<circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>',
    sunrise: '<path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m17.66 12.34 1.41-1.41"/><path d="M22 22H2"/><path d="m8 6 4-4 4 4"/><path d="M16 18a4 4 0 0 0-8 0"/>',
    mapPin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>',
    moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
    leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
    phone: '<path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384Z"/>',
    quizQ: '<circle cx="11" cy="11" r="8"/><path d="m14 14 5 5"/>',
    mail: '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
    whatsapp: '<path d="M17.6 6.3A7.85 7.85 0 0 0 4.9 15.9L4 20l4.2-1.1a7.86 7.86 0 0 0 3.75.96h.01A7.85 7.85 0 0 0 17.6 6.3Z"/><path d="M9.3 8.6c-.15-.35-.31-.36-.46-.36l-.39-.01a.75.75 0 0 0-.54.25 2.26 2.26 0 0 0-.71 1.68c0 .99.72 1.95.82 2.08.1.14 1.4 2.23 3.46 3.05 1.71.68 2.06.54 2.43.5.37-.03 1.2-.49 1.37-.96.17-.47.17-.87.12-.96-.05-.08-.19-.13-.39-.23-.2-.1-1.2-.59-1.38-.66-.19-.07-.32-.1-.46.1-.13.2-.52.66-.64.79-.12.14-.24.15-.44.05a5.55 5.55 0 0 1-1.63-1c-.6-.54-1.01-1.2-1.13-1.4-.12-.2-.01-.31.09-.41.09-.09.2-.24.3-.35.1-.12.13-.2.2-.34.06-.13.03-.25-.02-.35-.05-.1-.44-1.09-.6-1.49Z"/>',
    instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
    tiktok: '<path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>',
    feather: '<path d="M12.67 19a2 2 0 0 0 1.416-.588l6.154-6.172a6 6 0 0 0-8.49-8.49L5.586 9.914A2 2 0 0 0 5 11.328V18a1 1 0 0 0 1 1z"/><path d="M16 8 2 22"/><path d="M17.5 15H9"/>',
    star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/>',
  };
  function Icon({ name, size = 20, stroke = 2, style = {}, className = '' }) {
    return React.createElement('svg', {
      width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
      stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round',
      strokeLinejoin: 'round', className, style,
      dangerouslySetInnerHTML: { __html: P[name] || '' },
    });
  }
  window.Icon = Icon;
})();
