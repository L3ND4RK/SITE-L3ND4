(() => {
  'use strict';
  if (document.getElementById('photos-page')) return;
  const base = new URL('.', document.currentScript?.src || document.baseURI);
  const element = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text !== undefined) e.textContent = text; return e; };
  const stylesheet = element('link'); stylesheet.rel = 'stylesheet'; stylesheet.href = new URL('fotos.css', base).href; document.head.append(stylesheet);
  const main = document.querySelector('main'); if (!main) return;
  const root = element('section', 'photos-page'); root.id = 'photos-page'; root.hidden = true; root.setAttribute('aria-labelledby', 'photos-title');
  main.insertBefore(root, document.getElementById('videos') || main.querySelector('.closing'));
  function safeImage(value) {
    if (typeof value !== 'string' || !value.trim()) return '';
    try { const url = new URL(value, base); if (url.protocol === 'https:' && /^https:\/\//.test(value)) return url.href;
      if (value.startsWith('./assets/') && url.href.startsWith(new URL('assets/', base).href)) return url.href;
    } catch {} return '';
  }
  const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  function start(data, failed = false) {
    const photos = (Array.isArray(data.photos) ? data.photos : []).filter(p => p && safeImage(p.src)).map((p, i) => ({ ...p, src: safeImage(p.src), title: String(p.title || 'Memória do encontro'), album: String(p.album || 'Encontros da guild'), originalIndex: i }));
    const photoCount = document.getElementById('archive-photos'); if (photoCount) photoCount.textContent = failed ? '—' : String(photos.length);
    const since = document.getElementById('archive-since'); const photoYears = photos.map(p => Number(String(p.date || '').slice(0, 4))).filter(y => Number.isInteger(y) && y >= 1900 && y <= new Date().getFullYear()); if (since && photoYears.length) { const current = Number(since.textContent); since.textContent = String(Math.min(...photoYears, current >= 1900 ? current : Infinity)); }
    const albums = [...new Set(photos.map(p => p.album))];
    let album = '', matches = [], current = -1, previousFocus;
    const intro = element('div', 'photos-intro'), copy = element('div');
    const title = element('h2', '', data.title || 'Fotos de Pangya'); title.id = 'photos-title'; title.tabIndex = -1;
    copy.append(element('p', 'eyebrow', 'CAPTURAS DO JOGO & ENCONTROS DA GUILD'), title, element('p', '', data.description || 'As imagens do jogo e dos encontros, organizadas para revisitar cada lembrança.'));
    if (data.guildName) copy.append(element('span', 'photos-guild', String(data.guildName)));
    const art = element('div', 'photos-intro-art'); art.setAttribute('aria-hidden', 'true');
    // Ícone decorativo local; nenhum rosto ou fotografia é inventado.
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 100 100');
    const iconPath = document.createElementNS('http://www.w3.org/2000/svg', 'path'); iconPath.setAttribute('d', 'M16 27h18l7-10h20l7 10h16v53H16V27Zm34 12a15 15 0 1 0 0 30 15 15 0 0 0 0-30ZM70 36h6'); iconPath.setAttribute('fill', 'none'); iconPath.setAttribute('stroke', 'currentColor'); iconPath.setAttribute('stroke-width', '3'); svg.append(iconPath); art.append(svg, element('span', '', 'GUILD / MEMÓRIAS COMPARTILHADAS')); intro.append(copy, art); root.append(intro);
    const controls = element('div', 'photos-controls'), filters = element('div', 'photos-albums'); filters.setAttribute('aria-label', 'Filtrar por álbum');
    [['', 'Todos os álbuns'], ...albums.map(name => [name, name])].forEach(([value, label]) => { const button = element('button', '', label); button.type = 'button'; button.dataset.album = value; button.addEventListener('click', () => { album = value; render(); }); filters.append(button); });
    const searchLabel = element('label', 'search photos-search'), input = element('input'); input.type = 'search'; input.placeholder = 'Buscar encontro, local ou lembrança…'; input.setAttribute('aria-label', 'Buscar fotos'); searchLabel.append(element('span', '', '⌕'), input); controls.append(filters, searchLabel); root.append(controls);
    const count = element('p', 'photos-count'); count.setAttribute('role', 'status'); count.setAttribute('aria-live', 'polite');
    const grid = element('div', 'photos-grid'), empty = element('div', 'photos-empty'); root.append(count, grid, empty);
    root.append(element('p', 'photos-note', 'Capturas de Pangya e fotos dos encontros da guild. Cada álbum guarda uma parte da história.'));
    const modal = element('dialog', 'photo-lightbox'); modal.setAttribute('aria-labelledby', 'photo-modal-title');
    const top = element('div', 'dialog-top'), heading = element('h2'); heading.id = 'photo-modal-title';
    const close = element('button', 'close photo-close', '×'); close.type = 'button'; close.setAttribute('aria-label', 'Fechar foto'); top.append(heading, close);
    const viewport = element('div', 'photo-full-wrap'), full = element('img', 'photo-full'), loadStatus = element('p', 'photo-load-status'); loadStatus.setAttribute('role', 'status'); viewport.append(full, loadStatus);
    const details = element('div', 'photo-details'), meta = element('p', 'photo-details-meta'), caption = element('p', 'photo-details-caption');
    const navigation = element('div', 'photo-navigation'), prev = element('button', 'secondary', '← Anterior'), next = element('button', 'secondary', 'Próxima →'), position = element('output'); prev.type = next.type = 'button'; position.setAttribute('aria-live', 'polite'); navigation.append(prev, position, next); details.append(meta, caption, navigation); modal.append(top, viewport, details); document.body.append(modal);
    function showPhoto(index) {
      if (index < 0 || index >= matches.length) return;
      current = index; const photo = matches[index]; heading.textContent = photo.title;
      meta.textContent = [photo.album, photo.date, photo.location].filter(Boolean).join(' · '); caption.textContent = photo.caption || ''; caption.hidden = !photo.caption;
      full.hidden = true; loadStatus.hidden = false; loadStatus.textContent = 'Carregando foto…';
      full.alt = String(photo.alt || [photo.title, photo.caption].filter(Boolean).join('. '));
      full.onload = () => { full.hidden = false; loadStatus.hidden = true; };
      full.onerror = () => { full.hidden = true; loadStatus.hidden = false; loadStatus.textContent = 'Esta foto não pôde ser carregada. Confira o arquivo e o caminho no acervo.'; };
      full.src = photo.src; prev.disabled = index === 0; next.disabled = index === matches.length - 1; position.textContent = `${index + 1} / ${matches.length}`;
      if (!modal.open) { previousFocus = document.activeElement; modal.showModal(); close.focus(); }
    }
    function render() {
      const query = normalize(input.value.trim());
      matches = photos.filter(p => (!album || p.album === album) && normalize([p.title, p.album, p.date, p.location, p.caption, p.alt].join(' ')).includes(query));
      filters.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.album === album)));
      count.textContent = `${matches.length} ${matches.length === 1 ? 'foto' : 'fotos'} · ${albums.length} ${albums.length === 1 ? 'álbum' : 'álbuns'}`; grid.replaceChildren(); empty.replaceChildren(); empty.hidden = matches.length > 0;
      if (!matches.length) {
        empty.append(element('span', 'photos-empty-mark', '▧'), element('h2', '', failed ? 'O acervo não pôde ser carregado.' : photos.length ? 'Nenhuma foto com esse filtro.' : 'As melhores lembranças vão morar aqui.'), element('p', '', failed ? 'Confira se fotos-config.js foi enviado junto com a galeria.' : photos.length ? 'Tente outro termo ou volte para todos os álbuns.' : 'O espaço está pronto para receber suas capturas de Pangya e as fotos dos encontros da guild. Cada imagem poderá ter álbum, data, local e uma história para contar.'));
        if (photos.length) { const clear = element('button', 'secondary', 'Ver todas as fotos'); clear.type = 'button'; clear.addEventListener('click', () => { album = ''; input.value = ''; render(); input.focus(); }); empty.append(clear); }
      }
      matches.forEach((photo, index) => {
        const card = element('button', 'photo-card'); card.type = 'button'; card.setAttribute('aria-label', 'Ampliar foto: ' + photo.title);
        const image = element('img', 'photo-image'); image.src = safeImage(photo.thumbnail) || photo.src; image.alt = ''; image.loading = 'lazy'; image.decoding = 'async';
        image.addEventListener('error', () => { image.replaceWith(element('span', 'photo-unavailable', 'Imagem indisponível · abra para conferir')); });
        const cardCopy = element('span', 'photo-card-copy'); cardCopy.append(element('small', '', photo.album), element('strong', '', photo.title), element('span', '', [photo.date, photo.location].filter(Boolean).join(' · ')));
        card.append(image, cardCopy); card.addEventListener('click', () => showPhoto(index)); grid.append(card);
      });
    }
    close.addEventListener('click', () => modal.close()); prev.addEventListener('click', () => showPhoto(current - 1)); next.addEventListener('click', () => showPhoto(current + 1));
    modal.addEventListener('keydown', event => { if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(current - 1); } if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(current + 1); } });
    modal.addEventListener('close', () => { full.onload = full.onerror = null; full.removeAttribute('src'); previousFocus?.focus(); });
    modal.addEventListener('click', event => { if (event.target !== modal) return; const box = modal.getBoundingClientRect(); if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) modal.close(); });
    input.addEventListener('input', render);
    function route() {
      const visible = ['#pangya/fotos', '#fotos'].includes(location.hash); root.hidden = !visible;
      if (!visible && modal.open) modal.close();
    }
    window.addEventListener('hashchange', route); render(); route();
  }
  if (window.L3ND4_FOTOS) start(window.L3ND4_FOTOS);
  else { const config = element('script'); config.src = new URL('fotos-config.js', base).href; config.onload = () => start(window.L3ND4_FOTOS || {}, !window.L3ND4_FOTOS); config.onerror = () => start({}, true); document.head.append(config); }
})();
