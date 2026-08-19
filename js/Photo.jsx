/* Photo — warm placeholder for art-directed landscape photography.
   Replace with real <img> or an <image-slot> when brand photos exist.
   Carries the one system shadow when `raised`. */
const GTG_PHOTO_MOODS = {
  coast:    'linear-gradient(160deg, #cdd9df 0%, #9fbecd 45%, #638da6 100%)',
  desert:   'linear-gradient(160deg, #ded0b8 0%, #c9ab86 50%, #af8b68 100%)',
  forest:   'linear-gradient(160deg, #cbd3c4 0%, #9daa93 55%, #6d7d69 100%)',
  mountain: 'linear-gradient(165deg, #d8d3ca 0%, #a99f97 55%, #6f5d4e 100%)',
  dawn:     'linear-gradient(180deg, #fdf3c9 0%, #d9c9a0 52%, #9fb2c0 100%)',
  room:     'linear-gradient(160deg, #efe8db 0%, #ddd0bd 60%, #c2ab8c 100%)',
  water:    'linear-gradient(170deg, #d4e1e6 0%, #9cbccb 50%, #5f89a2 100%)',
  dusk:     'linear-gradient(180deg, #e6d6bd 0%, #b79a7f 48%, #6b5847 100%)',
  meadow:   'linear-gradient(165deg, #eee9c0 0%, #c9c893 52%, #97996a 100%)',
  sand:     'linear-gradient(160deg, #f1e7d2 0%, #ddc9a4 55%, #c0a374 100%)',
};
function Photo({ mood = 'desert', label, raised = false, ratio, style = {}, children }) {
  return (
    <div
      className={'gtg-photo' + (raised ? ' gtg-photo--raised' : '')}
      style={{ background: GTG_PHOTO_MOODS[mood] || GTG_PHOTO_MOODS.desert, aspectRatio: ratio, ...style }}
    >
      {label && <span className="gtg-photo-tag">{label}</span>}
      {children}
    </div>
  );
}
window.Photo = Photo;
window.GTG_PHOTO_MOODS = GTG_PHOTO_MOODS;
