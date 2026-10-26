(() => {
  'use strict';
  const config = window.PORTAL_CONFIG || {};
  const games = {
    pangya: { name: 'Pangya', word: 'PANGYA', icon: '⚑', subtitle: 'Cada tacada, uma história', color: '#75ddd4', glow: '#326f6b66' },
    yugioh: { name: 'Yu-Gi-Oh!', word: 'DUEL!', icon: '♠', subtitle: 'É hora do duelo', color: '#c6a2ff', glow: '#6d3da666' },
    mu: { name: 'MU Online', word: 'MU ONLINE', icon: '⚔', subtitle: 'A aventura não para', color: '#f3b779', glow: '#9b5c3166' },
    outros: { name: 'Outros jogos', word: 'NEXT PLAY', icon: '✦', subtitle: 'Novos mundos te esperam', color: '#7cbfff', glow: '#285b9b66' }
  };
  const $ = (id) => document.getElementById(id);
  const node = (tag, className, text) => { const e = document.createElement(tag); if (className) e.className = className; if (text !== undefined) e.textContent = text; return e; };
  const validId = (id) => typeof id === 'string' && /^[\w-]{11}$/.test(id);
  const normalize = (value) => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const videos = (Array.isArray(config.videos) ? config.videos : []).filter(v => v && games[v.game]).map(v => ({ ...v, title: String(v.title || 'Vídeo sem título'), description: String(v.description || ''), tags: Array.isArray(v.tags) ? v.tags : [] }));
  let active = 'all';
  let previousFocus;
  const navigation = [['home', 'Início'], ...Object.entries(games).map(([key, value]) => [key, value.name]), ['lives', 'Lives']];
  navigation.forEach(([key, name]) => { const a = node('a', '', name); a.href = '#' + key; a.dataset.route = key; $('nav').append(a); });
  Object.entries(games).forEach(([key, game]) => {
    const a = node('a', 'game-tile'); a.href = '#' + key; a.style.setProperty('--accent', game.color);
    const icon = node('span', 'game-icon', game.icon); icon.setAttribute('aria-hidden', 'true');
    const copy = node('span'); copy.append(node('strong', '', game.name), node('small', '', game.subtitle));
    a.append(icon, copy, node('span', 'arrow', '↗')); $('game-links').append(a);
  });
  [['all', 'Todos'], ...Object.entries(games).map(([key, game]) => [key, game.name])].forEach(([key, name]) => {
    const button = node('button', 'filter', name); button.type = 'button'; button.dataset.game = key;
    button.addEventListener('click', () => { active = key; render(); }); $('filters').append(button);
  });
  function openPlayer(video) {
    previousFocus = document.activeElement;
    $('player-title').textContent = video.title; $('player-category').textContent = games[video.game].name;
    $('player-description').textContent = video.description; $('player-content').replaceChildren(); $('player-link').replaceChildren();
    if (validId(video.youtubeId)) {
      const iframe = node('iframe'); iframe.src = 'https://www.youtube-nocookie.com/embed/' + video.youtubeId + '?rel=0'; iframe.title = video.title; iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'; iframe.allowFullscreen = true; iframe.referrerPolicy = 'strict-origin-when-cross-origin'; $('player-content').append(iframe);
      const a = node('a', 'secondary', 'Assistir no YouTube ↗'); a.href = 'https://www.youtube.com/watch?v=' + video.youtubeId; a.target = '_blank'; a.rel = 'noopener noreferrer'; $('player-link').append(a);
    } else {
      const box = node('div'); box.append(node('h3', '', 'Seu vídeo entra aqui.'), node('p', '', 'Este é um card de exemplo, sem vídeo vinculado.'), node('p', '', 'Preencha youtubeId em config.js com o ID do seu vídeo.')); $('player-content').append(box);
    }
    $('player-dialog').showModal(); $('close-player').focus();
  }
  function render() {
    document.querySelectorAll('.filter').forEach(b => { const selected = b.dataset.game === active; b.classList.toggle('active', selected); b.setAttribute('aria-pressed', String(selected)); });
    const query = normalize($('search').value.trim());
    const list = videos.filter(v => (active === 'all' || v.game === active) && normalize([v.title, v.description, games[v.game].name, ...v.tags].join(' ')).includes(query));
    list.sort($('sort').value === 'title' ? (a, b) => a.title.localeCompare(b.title, 'pt-BR') : (a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
    $('video-grid').replaceChildren(); $('empty').hidden = list.length !== 0;
    $('result-count').textContent = `${list.length} ${list.length === 1 ? 'vídeo encontrado' : 'vídeos encontrados'}`;
    const hasExamples = videos.some(v => !validId(v.youtubeId)); document.querySelector('.demo-notice').hidden = !hasExamples;
    list.forEach(v => {
      const game = games[v.game]; const real = validId(v.youtubeId);
      const card = node('button', 'video-card'); card.type = 'button'; card.setAttribute('aria-label', (real ? 'Assistir: ' : 'Abrir exemplo: ') + v.title); card.style.setProperty('--accent', game.color); card.style.setProperty('--glow', game.glow);
      const thumb = node('div', 'thumbnail'); thumb.append(node('span', 'thumb-word', game.word));
      if (real) { const img = node('img'); img.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); thumb.append(img); }
      else thumb.append(node('span', 'thumb-example', 'CONTEÚDO DE EXEMPLO'));
      const play = node('span', 'play-icon', '▶'); play.setAttribute('aria-hidden', 'true'); thumb.append(play);
      if (v.duration) thumb.append(node('span', 'duration', String(v.duration)));
      const meta = node('div', 'card-meta'); meta.append(node('span', 'card-game', game.name.toUpperCase()), node('span', '', '•'), node('span', '', real ? 'YOUTUBE' : 'DEMONSTRAÇÃO'));
      card.append(thumb, meta, node('h3', '', v.title), node('p', '', real ? 'Assistir gameplay ↗' : 'Prévia do seu próximo conteúdo'));
      card.addEventListener('click', () => openPlayer(v)); $('video-grid').append(card);
    });
  }
  function route() {
    const requested = location.hash.slice(1) || 'home';
    // #videos is an anchor on Home; game routes remain shareable on GitHub Pages.
    const current = navigation.some(([key]) => key === requested) ? requested : 'home';
    const liveOnly = current === 'lives'; const category = games[current];
    $('hero').hidden = current !== 'home'; $('games-section').hidden = current !== 'home'; $('videos').hidden = liveOnly;
    $('lives-section').hidden = Boolean(category);
    $('library-title').textContent = category ? category.name : 'Bora dar o play?';
    $('library-eyebrow').textContent = category ? 'GAMEPLAYS · ' + category.name.toUpperCase() : 'BIBLIOTECA L3ND4';
    active = category ? current : 'all';
    document.querySelectorAll('#nav a').forEach(a => { if (a.dataset.route === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.title = `${category ? category.name : liveOnly ? 'Lives' : 'Início'} | L3ND4 GAMES`;
    render();
    if (requested === 'videos') $('videos').scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
  }
  function setupTwitch() {
    const twitch = config.twitch || {}; const channel = typeof twitch.channel === 'string' ? twitch.channel.trim() : '';
    if (!/^[a-zA-Z0-9_]{1,25}$/.test(channel)) return;
    $('live-status').textContent = 'CANAL CONFIGURADO · STATUS NA TWITCH';
    const link = node('a', '', 'Abrir canal na Twitch ↗'); link.href = 'https://www.twitch.tv/' + encodeURIComponent(channel); link.target = '_blank'; link.rel = 'noopener noreferrer'; $('twitch-actions').append(link);
    $('twitch-player').replaceChildren();
    if (!twitch.embed || !/^https?:$/.test(location.protocol)) {
      $('twitch-player').append(node('h3', '', 'Acompanhe pelo canal da Twitch'), node('p', '', 'Use o link ao lado para assistir. A incorporação precisa de um site servido por HTTP ou HTTPS.')); return;
    }
    const button = node('button', 'secondary', 'Carregar player da Twitch');
    $('twitch-player').append(node('h3', '', 'A resenha tem lugar marcado.'), node('p', '', 'Carregue o player para conectar com a Twitch.'), button);
    button.addEventListener('click', () => {
      if ($('twitch-player').clientWidth < 400) {
        $('twitch-player').replaceChildren(node('h3', '', 'Continue na Twitch'), node('p', '', 'Nesta tela compacta, use o link do canal para assistir.'));
        return;
      }
      $('twitch-player').style.minHeight = '300px';
      const parents = [...new Set([location.hostname, ...(Array.isArray(twitch.parents) ? twitch.parents : [])])].filter(p => typeof p === 'string' && /^[a-zA-Z0-9.-]+$/.test(p));
      const params = new URLSearchParams({ channel, autoplay: 'false', muted: 'true' }); parents.forEach(p => params.append('parent', p));
      const iframe = node('iframe'); iframe.src = 'https://player.twitch.tv/?' + params; iframe.title = 'Transmissão Twitch de ' + channel; iframe.allowFullscreen = true; iframe.allow = 'autoplay; fullscreen'; $('twitch-player').replaceChildren(iframe);
    });
  }
  $('search').addEventListener('input', render); $('sort').addEventListener('change', render);
  $('reset').addEventListener('click', () => { $('search').value = ''; location.hash = 'videos'; active = 'all'; render(); $('search').focus(); });
  $('close-player').addEventListener('click', () => $('player-dialog').close());
  $('player-dialog').addEventListener('click', event => { if (event.target === $('player-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
  $('player-dialog').addEventListener('close', () => { $('player-content').replaceChildren(); previousFocus?.focus(); });
  document.addEventListener('keydown', event => { if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('player-dialog').open) { event.preventDefault(); if ($('videos').hidden) location.hash = 'videos'; $('search').focus(); } });
  $('year').textContent = new Date().getFullYear(); window.addEventListener('hashchange', route); setupTwitch(); route();
})();
