/* Shared data + tiny helpers for GroundingtoGo site (exported to window) */

/* ---- Travel-style archetypes (drive the quiz result + the style page) --- */
const GTG_STYLES = [
  {
    id: 'coast',
    name: 'The Coastal Drifter',
    tag: 'You reset to the rhythm of water.',
    mood: 'water',
    swatch: 'water',
    body: 'You don\u2019t need much \u2014 a long shoreline, slow mornings, and the sound of the tide doing the thinking for you. Your reset is salt air, bare feet, and afternoons that lose their shape. We point you toward quiet coasts where nothing is scheduled and the only appointment is the light on the water.',
    traits: ['Slow mornings', 'Open water', 'Soft horizons', 'Long walks'],
    pace: 'Barely moving', nights: '5\u20137 nights', place: 'Comporta \u00b7 West Cork',
    pkg: 'Coastal Portugal',
  },
  {
    id: 'desert',
    name: 'The Desert Wanderer',
    tag: 'You reset by going far and wide.',
    mood: 'sand',
    swatch: 'desert',
    body: 'You crave real distance \u2014 wide, warm, gloriously empty. Out where the map runs out, you can finally hear yourself. Your reset is endless sky, deep silence, and stars so thick they feel close enough to touch. We send you somewhere off the grid, with just enough comfort to stay.',
    traits: ['Wide open space', 'Total quiet', 'Big skies', 'Off the map'],
    pace: 'Slow', nights: '4\u20135 nights', place: 'Joshua Tree \u00b7 Sedona',
    pkg: 'High Desert',
  },
  {
    id: 'forest',
    name: 'The Forest Dweller',
    tag: 'You reset under tall, quiet trees.',
    mood: 'meadow',
    swatch: 'forest',
    body: 'You want to be tucked out of sight \u2014 green light, soft ground, the kind of silence you can hear. Your reset is a cabin under old growth, a fire at night, and a mind that finally slows to walking pace. We find you the trees, the stillness, and nothing you have to keep up with.',
    traits: ['Deep shade', 'Birdsong', 'Cabins', 'Stillness'],
    pace: 'Slower', nights: '5\u20136 nights', place: 'Olympic, WA \u00b7 Cascades',
    pkg: 'Old-growth Forest',
  },
  {
    id: 'mountain',
    name: 'The Mountain Riser',
    tag: 'You reset in cold, clear, high air.',
    mood: 'dawn',
    swatch: 'mountain',
    body: 'You want to climb above it all \u2014 thin air, first light on a ridge, a horizon you have to earn. Your reset is dawn quiet, deep sleep, and a head that clears the higher you go. We route you to slow mountain mornings where the only thing rushing is the weather.',
    traits: ['High air', 'Dawn light', 'Deep sleep', 'Clear head'],
    pace: 'Slow', nights: '6\u20137 nights', place: 'Dolomites \u00b7 Cascades',
    pkg: 'Dawn Mountains',
  },
];

/* ---- Packages / offers (filterable grid on home) ----------------------- */
const GTG_TRIPS = [
  { name: 'Coastal Portugal', place: 'Comporta', category: 'Coast', mood: 'water', nights: 7, price: 2400, blurb: 'Long mornings by the Atlantic, nowhere to be.' },
  { name: 'Quiet Coast', place: 'West Cork', category: 'Coast', mood: 'coast', nights: 5, price: 1750, blurb: 'Green cliffs, grey sea, and slow village days.' },
  { name: 'High Desert', place: 'Joshua Tree', category: 'Desert', mood: 'desert', nights: 5, price: 1900, blurb: 'Wide, warm and empty. Stars all the way down.' },
  { name: 'Red Rock Reset', place: 'Sedona', category: 'Desert', mood: 'sand', nights: 4, price: 1600, blurb: 'Warm stone, deep quiet, a short and soft escape.' },
  { name: 'Old-growth Forest', place: 'Olympic, WA', category: 'Forest', mood: 'forest', nights: 6, price: 2100, blurb: 'A cabin under tall trees and audible silence.' },
  { name: 'Dawn Mountains', place: 'Dolomites', category: 'Mountains', mood: 'dawn', nights: 7, price: 2800, blurb: 'First light on the ridges, deep alpine sleep.' },
];

/* ---- Testimonials ------------------------------------------------------ */
const GTG_TESTI = [
  { quote: 'I went away to disappear for a week. I came back able to hear myself again.', name: 'Maya R.', trip: 'Seven nights \u00b7 Coastal Portugal', mood: 'water' },
  { quote: 'No itinerary to keep up with. For the first time in years, my days had no shape \u2014 and it was exactly what I needed.', name: 'Priya N.', trip: 'Five nights \u00b7 High Desert', mood: 'desert' },
  { quote: 'They planned everything in one call, then quietly handled the rest. I just had to show up and breathe.', name: 'Lena K.', trip: 'Six nights \u00b7 Old-growth Forest', mood: 'forest' },
  { quote: 'I was nervous about travelling alone. By day two I never wanted the quiet to end.', name: 'Sofia M.', trip: 'Four nights \u00b7 Red Rock Reset', mood: 'sand' },
  { quote: 'The mountains gave me back a clear head. I came home lighter than I have felt in a long time.', name: 'Hana T.', trip: 'Seven nights \u00b7 Dawn Mountains', mood: 'dawn' },
  { quote: 'Somewhere to land \u2014 they meant it. I landed, and I stayed landed for a while after I got home.', name: 'Amara B.', trip: 'Five nights \u00b7 Quiet Coast', mood: 'coast' },
];

/* ---- reveal-on-scroll: adds .in when a .reveal enters the viewport ----- */
function useReveal() {
  React.useEffect(() => {
    const els = Array.prototype.slice.call(document.querySelectorAll('.reveal, .reveal-pan'));
    const show = (el) => el.classList.add('in');
    if (!els.length) return;
    if (!('IntersectionObserver' in window)) { els.forEach(show); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => { if (en.isIntersecting) { show(en.target); io.unobserve(en.target); } });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    els.forEach((el) => io.observe(el));
    // immediate pass: anything already on screen reveals right away
    requestAnimationFrame(() => {
      els.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) show(el); });
    });
    return () => io.disconnect();
  }, []);
}

Object.assign(window, { GTG_STYLES, GTG_TRIPS, GTG_TESTI, useReveal });
