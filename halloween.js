(() => {
  'use strict';
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  const status = document.getElementById('theme-status');
  const image = document.querySelector('.hero-memory-tile[href="#pangya"] .hero-memory-image');
  const originalImage = image?.getAttribute('src');
  const meta = document.querySelector('meta[name="theme-color"]');
  const storageKey = 'l3nd4-site-theme';
  function apply(theme, save = false) {
    const halloween = theme === 'halloween';
    root.dataset.theme = halloween ? 'halloween' : 'classic';
    if (button) { button.setAttribute('aria-pressed', String(halloween)); button.textContent = halloween ? 'Halloween: ativado' : 'Halloween: desativado'; }
    if (status) status.textContent = halloween ? 'Pangya em clima de Halloween' : 'Seu acervo no tema original';
    if (meta) meta.setAttribute('content', halloween ? '#100c19' : '#0b0c14');
    if (image) {
      image.src = halloween ? './assets/pangya-halloween.jpg' : originalImage;
      image.onerror = () => { image.onerror = null; if (originalImage) image.src = originalImage; };
    }
    if (save) { try { localStorage.setItem(storageKey, root.dataset.theme); } catch {} }
  }
  let theme = root.dataset.theme || 'halloween';
  try { const saved = localStorage.getItem(storageKey); if (saved === 'classic' || saved === 'halloween') theme = saved; } catch {}
  apply(theme);
  button?.addEventListener('click', () => apply(root.dataset.theme === 'halloween' ? 'classic' : 'halloween', true));
})();