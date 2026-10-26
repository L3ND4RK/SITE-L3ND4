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
  const safeAsset = (value) => typeof value === 'string' && (/^\.\/assets\/[a-zA-Z0-9_./ -]+$/.test(value) || /^https:\/\//.test(value)) ? value : '';
  const artwork = config.artwork || {};
  function gameImage(key, className, useIcon = false) {
    const data = artwork[key] || {}, src = safeAsset(useIcon ? data.icon : data.image); if (!src) return null;
    const img = node('img', className); img.src = src; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); return img;
  }
  function dateLabel(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return '';
    const date = new Date(value + 'T12:00:00');
    if (Number.isNaN(date.getTime()) || date.getFullYear() !== Number(value.slice(0, 4)) || date.getMonth() + 1 !== Number(value.slice(5, 7)) || date.getDate() !== Number(value.slice(8, 10))) return '';
    return date.toLocaleDateString('pt-BR');
  }
  const videos = (Array.isArray(config.videos) ? config.videos : []).filter(v => v && games[v.game]).map(v => ({ ...v, title: String(v.title || 'Vídeo sem título'), description: String(v.description || ''), tags: Array.isArray(v.tags) ? v.tags : [] }));
  let active = 'all';
  let previousFocus;
  const navigation = [['home', 'Início'], ...Object.entries(games).map(([key, value]) => [key, value.name]), ['calculadora-s4', 'Calculadora S4'], ['lives', 'Lives']];
  navigation.forEach(([key, name]) => { const a = node('a', '', name); a.href = '#' + key; a.dataset.route = key; $('nav').append(a); });
  Object.entries(games).forEach(([key, game]) => {
    const a = node('a', 'game-tile'); a.href = '#' + key; a.style.setProperty('--accent', game.color);
    const icon = node('span', 'game-icon', game.icon); icon.setAttribute('aria-hidden', 'true');
    const copy = node('span'); copy.append(node('strong', '', game.name), node('small', '', game.subtitle));
    const cover = gameImage(key, 'tile-cover'); if (cover) a.append(cover);
    const emblem = gameImage(key, 'game-icon-image', true); if (emblem) icon.replaceChildren(emblem);
    a.dataset.game = key;
    a.append(icon, copy, node('span', 'arrow', '↗')); $('game-links').append(a);
  });
  const calculatorTile = node('a', 'game-tile calculator-tile'); calculatorTile.href = '#calculadora-s4'; calculatorTile.style.setProperty('--accent', '#ae7cff');
  const calculatorCopy = node('span'); calculatorCopy.append(node('strong', '', 'Calculadora S4'), node('small', '', 'Central de download'));
  calculatorTile.append(node('span', 'game-icon', '▦'), calculatorCopy, node('span', 'arrow', '↗')); $('game-links').append(calculatorTile);
  const pageDetails = {
    pangya: { label: 'GOLFE FANTASIA / PANGYA', title: 'Precisão na tacada.\nDiversão na rodada.', intro: 'Entre no universo de Pangya: campos cheios de personalidade, desafios a cada buraco e aquela vontade de tentar só mais uma tacada.', topics: [['01 / CAMPOS', 'Explore o percurso', 'Conheça campos como Blue Lagoon e Sepia Wind e acompanhe as rodadas do portal.'], ['02 / GAMEPLAY', 'Cada jogada conta', 'Um espaço para vídeos de tacadas, tentativas, acertos e momentos marcantes das partidas.'], ['03 / COMUNIDADE', 'Jogue junto', 'Reviva as melhores rodadas e acompanhe os novos vídeos de Pangya no L3ND4 GAMES.']], source: 'https://pangya.mygame.in.th/gameinfo/golfcourse', sourceLabel: 'Campos de Pangya · referência do jogo' },
    yugioh: { label: 'CARTAS & ESTRATÉGIA / YU-GI-OH!', title: 'Seu deck. Sua estratégia.\nSeu próximo duelo.', intro: 'Monstros, Magias e Armadilhas: cada carta abre uma possibilidade. Um espaço para acompanhar duelos e explorar as escolhas por trás de cada jogada.', topics: [['01 / CARTAS', 'Conheça seu arsenal', 'Monstros, Magias e Armadilhas formam a base do jogo de cartas. Entender como elas se combinam faz parte da estratégia.'], ['02 / DUELOS', 'Pense na próxima jogada', 'No jogo de cartas, os duelistas usam suas cartas para enfrentar o oponente e reduzir seus Pontos de Vida a zero.'], ['03 / VÍDEOS', 'Do deck para a mesa', 'Acompanhe os vídeos do portal com duelos, ideias de decks e momentos de virada.']], source: 'https://www.yugioh-card.com/en/rulebook/index.html', sourceLabel: 'Regras oficiais · Yu-Gi-Oh! TCG' },
    mu: { label: 'RPG & AVENTURA / MU ONLINE', title: 'Uma nova jornada.\nUma lenda para construir.', intro: 'Escolha seu caminho no universo de MU Online. Classes, evolução e aventuras se encontram neste espaço dedicado às jornadas do portal.', topics: [['01 / CLASSES', 'Escolha seu caminho', 'Dark Knight, Dark Wizard e Fairy Elf estão entre as classes do jogo. Conheça diferentes estilos antes de começar sua jornada.'], ['02 / PROGRESSÃO', 'Evolua a cada partida', 'Explore sua classe, os equipamentos e os desafios ao longo da aventura. Sistemas e conteúdo podem variar conforme a versão e o servidor.'], ['03 / GAMEPLAY', 'Acompanhe a jornada', 'Um espaço para vídeos de evolução, exploração e momentos marcantes em MU Online.']], source: 'https://muonline.webzen.com/en/gameinfo', sourceLabel: 'Guia oficial · MU Online / WEBZEN' },
    outros: { label: 'EXPLORAÇÃO / OUTROS JOGOS', title: 'Novos mundos.\nA mesma vontade de jogar.', intro: 'Toda descoberta merece um play. Aqui ficam os jogos que chegam para ampliar os universos do L3ND4 GAMES.', topics: [['01 / DESCOBERTAS', 'Primeiro contato', 'Um espaço para conhecer novos jogos e acompanhar as primeiras partidas.'], ['02 / MOMENTOS', 'Guarde a melhor parte', 'Gameplays, desafios e histórias que valem ser compartilhadas.'], ['03 / VARIEDADE', 'Sempre uma nova partida', 'Explore os vídeos de outros jogos publicados no portal.']] }
  };
  function showGamePage(key) {
    const root = $('game-page'); root.replaceChildren(); const game = games[key], detail = pageDetails[key];
    root.style.setProperty('--accent', game.color); root.style.setProperty('--glow', game.glow); root.dataset.game = key;
    const hero = node('div', 'game-banner'), copy = node('div', 'game-banner-copy');
    const back = node('a', 'game-back', '← Todos os universos'); back.href = '#home';
    const title = node('h1', '', detail.title); title.id = 'game-title';
    copy.append(back, node('p', 'eyebrow', detail.label), title, node('p', 'game-intro', detail.intro));
    const actions = node('div', 'hero-actions'); const watch = node('a', 'primary', 'Ver vídeos ↓'); watch.href = '#videos';
    // Scroll without changing route, so the library stays restricted to this game.
    watch.addEventListener('click', event => { event.preventDefault(); $('videos').scrollIntoView({ behavior: 'smooth' }); }); actions.append(watch);
    if (key === 'pangya') { const calc = node('a', 'secondary', 'Calculadora S4 ↗'); calc.href = '#calculadora-s4'; actions.append(calc); }
    copy.append(actions);
    const art = node('div', 'game-banner-art'); art.setAttribute('aria-hidden', 'true'); art.append(node('span', 'game-emblem', game.icon), node('strong', '', game.word), node('small', '', 'L3ND4 GAMES / ' + detail.label.split(' / ')[0]));
    const photo = gameImage(key, 'game-photo'); if (photo) { art.replaceChildren(photo); art.classList.add('has-photo'); }
    hero.append(copy, art); root.append(hero);
    const artData = artwork[key]; if (artData?.credit) { const credit = node('p', 'art-credit', artData.credit + ' · Arte temática, não é captura pessoal.'); root.append(credit); }
    const grid = node('div', 'game-details');
    detail.topics.forEach(([label, heading, description]) => { const article = node('article', 'game-detail'); article.append(node('p', 'eyebrow', label), node('h3', '', heading), node('p', '', description)); grid.append(article); }); root.append(grid);
    if (detail.source) { const a = node('a', 'game-source', detail.sourceLabel + ' ↗'); a.href = detail.source; a.target = '_blank'; a.rel = 'noopener noreferrer'; root.append(a); }
  }
  function setupCalculator() {
    const data = config.calculatorS4 || {}, root = $('calculator-page');
    root.style.setProperty('--accent', '#ae7cff'); root.style.setProperty('--glow', '#6d3da666');
    const hero = node('div', 'game-banner'), copy = node('div', 'game-banner-copy'); const back = node('a', 'game-back', '← Voltar para Pangya'); back.href = '#pangya';
    const title = node('h1', '', 'Calculadora S4'); title.id = 'calculator-title';
    copy.append(back, node('p', 'eyebrow', 'PANGYA / CENTRAL DE DOWNLOAD'), title, node('p', 'game-intro', data.description || 'Baixe a Calculadora S4 disponibilizada pelo portal.'));
    let url; try { const candidate = new URL(data.downloadUrl); if (candidate.protocol === 'https:') url = candidate.href; } catch {}
    if (url) { const a = node('a', 'primary', 'Baixar Calculadora S4 ↗'); a.href = url; a.target = '_blank'; a.rel = 'noopener noreferrer'; copy.append(a, node('p', 'download-status', 'O link abre o local de download em uma nova aba.')); }
    else { const button = node('button', 'primary', 'Download em breve'); button.disabled = true; copy.append(button, node('p', 'download-status', 'O link de download ainda não foi disponibilizado.')); }
    const meta = [data.version ? 'Versão: ' + data.version : '', data.fileSize ? 'Tamanho: ' + data.fileSize : ''].filter(Boolean); if (meta.length) copy.append(node('p', 'download-meta', meta.join(' · ')));
    const art = node('div', 'game-banner-art calculator-art'); art.setAttribute('aria-hidden', 'true'); art.append(node('span', 'game-emblem', '▦'), node('strong', '', 'S4'), node('small', '', 'CALCULADORA / DOWNLOAD')); hero.append(copy, art); root.append(hero);
    const guide = node('article', 'download-guide'); guide.append(node('p', 'eyebrow', 'PARA COMEÇAR'), node('h2', '', 'Como baixar'));
    const steps = node('ol'); const instructions = Array.isArray(data.instructions) ? data.instructions : ['Use o botão quando o link estiver disponível.', 'Siga as instruções que acompanham o arquivo.']; instructions.forEach(text => steps.append(node('li', '', String(text)))); guide.append(steps); root.append(guide);
  }
  [['all', 'Todos'], ...Object.entries(games).map(([key, game]) => [key, game.name])].forEach(([key, name]) => {
    const button = node('button', 'filter', name); button.type = 'button'; button.dataset.game = key;
    button.addEventListener('click', () => { active = key; render(); }); $('filters').append(button);
  });
  function openPlayer(video) {
    previousFocus = document.activeElement;
    $('player-title').textContent = video.title; $('player-category').textContent = games[video.game].name;
    $('player-description').textContent = video.description; $('player-content').replaceChildren(); $('player-link').replaceChildren();
    const info = node('div', 'memory-info');
    const details = [[validId(video.youtubeId) ? 'Data da jogatina' : 'Data ilustrativa do exemplo', dateLabel(video.date)], ['Personagem / deck', video.character], ['Mapa / modo', video.map], ['Servidor / versão', video.server]];
    details.forEach(([label, value]) => { if (!value) return; const item = node('div'); item.append(node('small', '', label), node('strong', '', String(value))); info.append(item); });
    if (info.children.length) $('player-link').append(info);
    if (video.memory) { const memory = node('aside', 'memory-note'); memory.append(node('p', 'eyebrow', 'UMA LEMBRANÇA DESTA PARTIDA'), node('p', '', String(video.memory))); $('player-link').append(memory); }
    if (safeAsset(video.screenshot)) { const figure = node('figure', 'memory-screenshot'), img = node('img'); img.src = safeAsset(video.screenshot); img.alt = video.screenshotCaption || 'Captura da jogatina: ' + video.title; img.loading = 'lazy'; figure.append(img, node('figcaption', '', video.screenshotCaption || 'Captura pessoal da partida')); $('player-link').append(figure); }
    if (video.id && /^https?:$/.test(location.protocol)) { const label = node('label', 'memory-permalink', 'Link desta memória'); const input = node('input'); input.type = 'text'; input.readOnly = true; input.value = location.origin + location.pathname + '#memoria=' + encodeURIComponent(video.id); input.addEventListener('focus', () => input.select()); label.append(input); $('player-link').append(label); }
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
    const year = $('archive-year').value;
    const list = videos.filter(v => (active === 'all' || v.game === active) && (!year || (dateLabel(v.date) && v.date.slice(0, 4) === year)) && normalize([v.title, v.description, games[v.game].name, v.character, v.map, v.server, v.memory, ...v.tags].join(' ')).includes(query));
    list.sort($('sort').value === 'title' ? (a, b) => a.title.localeCompare(b.title, 'pt-BR') : (a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
    $('video-grid').replaceChildren(); $('empty').hidden = list.length !== 0;
    $('result-count').textContent = `${list.length} ${list.length === 1 ? 'vídeo encontrado' : 'vídeos encontrados'}`;
    const hasExamples = videos.some(v => !validId(v.youtubeId)); $('library-demo').hidden = !hasExamples;
    list.forEach(v => {
      const game = games[v.game]; const real = validId(v.youtubeId);
      const card = node('button', 'video-card'); card.type = 'button'; card.setAttribute('aria-label', (real ? 'Assistir: ' : 'Abrir exemplo: ') + v.title); card.style.setProperty('--accent', game.color); card.style.setProperty('--glow', game.glow);
      const thumb = node('div', 'thumbnail'); thumb.append(node('span', 'thumb-word', game.word));
      const cover = gameImage(v.game, 'card-theme-image'); if (cover) thumb.append(cover);
      if (real) { const img = node('img'); img.src = `https://i.ytimg.com/vi/${v.youtubeId}/hqdefault.jpg`; img.alt = ''; img.loading = 'lazy'; img.addEventListener('error', () => img.remove()); thumb.append(img); }
      else thumb.append(node('span', 'thumb-example', 'CONTEÚDO DE EXEMPLO'));
      const play = node('span', 'play-icon', '▶'); play.setAttribute('aria-hidden', 'true'); thumb.append(play);
      if (v.duration) thumb.append(node('span', 'duration', String(v.duration)));
      const meta = node('div', 'card-meta'); meta.append(node('span', 'card-game', game.name.toUpperCase()), node('span', '', '•'), node('span', '', real ? 'YOUTUBE' : 'DEMONSTRAÇÃO'));
      card.append(thumb, meta, node('h3', '', v.title), node('p', '', real ? 'Assistir gameplay ↗' : 'Prévia do seu próximo conteúdo'));
      const date = dateLabel(v.date); if (date) { const time = node('time', 'memory-date', (real ? '' : 'Data ilustrativa · ') + date); time.dateTime = v.date; card.append(time); }
      card.addEventListener('click', () => openPlayer(v)); $('video-grid').append(card);
    });
  }
  function route() {
    const requested = location.hash.slice(1) || 'home';
    let memory; if (requested.startsWith('memoria=')) { try { memory = videos.find(v => v.id === decodeURIComponent(requested.slice(8))); } catch {} }
    // #videos is an anchor on Home; game routes remain shareable on GitHub Pages.
    const current = navigation.some(([key]) => key === requested) ? requested : 'home';
    const liveOnly = current === 'lives'; const calculatorOnly = current === 'calculadora-s4'; const category = games[current];
    $('hero').hidden = current !== 'home'; $('games-section').hidden = current !== 'home'; $('videos').hidden = liveOnly || calculatorOnly;
    $('lives-section').hidden = Boolean(category) || calculatorOnly;
    $('game-page').hidden = !category; $('calculator-page').hidden = !calculatorOnly;
    if (category) showGamePage(current);
    $('library-title').textContent = category ? 'Memórias de ' + category.name : 'O arquivo das minhas jogatinas';
    $('library-eyebrow').textContent = category ? 'ACERVO · ' + category.name.toUpperCase() : 'MEU ACERVO / CADA PLAY, UMA HISTÓRIA';
    active = category ? current : 'all';
    document.querySelectorAll('#nav a').forEach(a => { if (a.dataset.route === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.title = `${category ? category.name : calculatorOnly ? 'Calculadora S4' : liveOnly ? 'Lives' : 'Início'} | L3ND4 GAMES`;
    render();
    if (requested === 'videos') $('videos').scrollIntoView();
    else window.scrollTo({ top: 0, behavior: 'instant' });
    $('archive-about').hidden = current !== 'home';
    if (memory) { document.title = memory.title + ' | Acervo L3ND4 GAMES'; openPlayer(memory); }
    $('memory-missing').hidden = !requested.startsWith('memoria=') || Boolean(memory);
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
  function setupArchive() {
    const data = config.archive || {};
    if (data.title) $('hero-title').textContent = data.title;
    if (data.description) $('hero-description').textContent = data.description;
    if (data.about) $('archive-about-text').textContent = data.about;
    const years = [...new Set(videos.filter(v => dateLabel(v.date)).map(v => v.date.slice(0, 4)))].sort().reverse(); years.forEach(year => { const option = node('option', '', year); option.value = year; $('archive-year').append(option); });
    const actual = videos.filter(v => validId(v.youtubeId)); $('archive-total').textContent = String(actual.length); $('archive-games').textContent = String(new Set(actual.map(v => v.game)).size);
    Object.keys(games).slice(0, 3).forEach(key => { const image = gameImage(key, 'hero-memory-image'); if (!image) return; const link = node('a', 'hero-memory-tile'); link.href = '#' + key; link.append(image, node('span', '', games[key].name)); $('hero-collection').append(link); });
  }
  $('search').addEventListener('input', render); $('sort').addEventListener('change', render); $('archive-year').addEventListener('change', render);
  $('reset').addEventListener('click', () => { $('search').value = ''; $('archive-year').value = ''; location.hash = 'videos'; active = 'all'; render(); $('search').focus(); });
  $('close-player').addEventListener('click', () => $('player-dialog').close());
  $('player-dialog').addEventListener('click', event => { if (event.target === $('player-dialog')) { const r = event.target.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) event.target.close(); } });
  $('player-dialog').addEventListener('close', () => { $('player-content').replaceChildren(); previousFocus?.focus(); });
  document.addEventListener('keydown', event => { if (event.key === '/' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName) && !$('player-dialog').open) { event.preventDefault(); if ($('videos').hidden) location.hash = 'videos'; $('search').focus(); } });
  $('year').textContent = new Date().getFullYear(); window.addEventListener('hashchange', route); setupArchive(); setupCalculator(); setupTwitch(); route();
})();
