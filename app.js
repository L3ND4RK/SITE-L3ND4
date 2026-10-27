(() => {
  'use strict';
  const config = window.PORTAL_CONFIG || {};
  const archiveLayout = document.createElement('link');
  archiveLayout.rel = 'stylesheet';
  archiveLayout.href = new URL('acervo.css', document.currentScript?.src || document.baseURI).href;
  document.head.append(archiveLayout);
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
  function showGamePage(key, selectedSection = 'videos') {
    const root = $('game-page'); root.replaceChildren(); const game = games[key];
    root.style.setProperty('--accent', game.color); root.style.setProperty('--glow', game.glow); root.dataset.game = key;
    const hero = node('div', 'archive-game-header'), copy = node('div', 'archive-game-copy');
    const back = node('a', 'game-back', '← Todos os universos'); back.href = '#home';
    const title = node('h1', '', game.name); title.id = 'game-title';
    copy.append(back, node('p', 'eyebrow', key === 'pangya' ? 'MEU ACERVO / FOTOS & VÍDEOS' : 'MEU ACERVO / VÍDEOS'), title, node('p', 'archive-game-intro', key === 'pangya' ? 'Capturas do jogo, encontros da guild e as jogatinas que merecem ficar guardadas.' : 'Minhas jogatinas, momentos e histórias em vídeo.'));
    const art = node('div', 'archive-game-art'); art.setAttribute('aria-hidden', 'true');
    const photo = gameImage(key, 'archive-game-photo'); if (photo) art.append(photo); else art.append(node('span', 'game-emblem', game.icon));
    hero.append(copy, art); root.append(hero);
    if (key === 'pangya') {
      const tabs = node('nav', 'pangya-sections'); tabs.setAttribute('aria-label', 'Acervo de Pangya');
      [['videos', '▶', 'Vídeos'], ['fotos', '▧', 'Fotos'], ['historia', '✧', 'História da MF']].forEach(([section, icon, label]) => {
        const link = node('a', 'pangya-section-link'); link.href = '#pangya/' + section;
        const symbol = node('span', '', icon); symbol.setAttribute('aria-hidden', 'true'); link.append(symbol, node('span', '', label));
        if (section === selectedSection) link.setAttribute('aria-current', 'page'); tabs.append(link);
      });
      const calc = node('a', 'pangya-calculator-link', 'Calculadora S4 ↗'); calc.href = '#calculadora-s4'; tabs.append(calc); root.append(tabs);
    }
  }

  function setupGuildHistory() {
    const root = node('section', 'guild-history'); root.id = 'guild-history'; root.hidden = true; root.setAttribute('aria-labelledby', 'guild-history-title');
    $('game-page').after(root);
    const hero = node('header', 'guild-history-hero');
    const heading = node('h2', '', 'Nossa história'); heading.id = 'guild-history-title';
    hero.append(node('p', 'eyebrow', 'MEMÓRIA DA GUILD / -[MF]-MAFIA'), heading, node('p', 'guild-history-subtitle', 'De uma salinha de Pangya a uma família.'), node('p', 'guild-history-author', 'Relato de MF Lenne'));
    const quote = node('blockquote', 'guild-history-motto'); quote.append(node('p', '', 'Mais que uma guild. Uma família.'));
    hero.append(quote);
    root.append(hero, node('p', 'guild-history-editorial', 'Relato de MF Lenne, preservado no acervo L3ND4 GAMES. A data do texto original não foi informada. Nomes de lideranças, plataformas e referências como “até hoje” pertencem à época em que o relato foi escrito. Foram feitos ajustes de pontuação e organização para facilitar a leitura.'));
    const layout = node('div', 'guild-history-layout'), index = node('aside', 'guild-history-index'), article = node('article', 'guild-history-article');
    index.setAttribute('aria-label', 'Capítulos da história'); index.append(node('p', 'eyebrow', 'NESTA HISTÓRIA'));
    const chapters = [{"title":"As madrugadas no Pangya","paragraphs":["Nossa história começou com uma brincadeira que deu muito certo. Vou tentar resumir, voltando um pouco ao passado.","Comecei a jogar Pangya quando chegou White Wiz, o mapa de Natal, mas jogava muito à noite e atravessava a madrugada — até hoje… rsrs.","Todos os dias, várias pessoas acabavam caindo nas mesmas salinhas de torneio. Eram, na maioria, pais e mães de família, adultos entre mulheres e homens, que só tinham tempo para jogar naqueles horários, após o trabalho.","Fomos nos descobrindo: nomes, idades… e nos tornando amigos a cada dia."]},{"title":"Uma brincadeira que virou MaFia","paragraphs":["Certo dia, em um desses camps, um garoto perguntou a alguém da sala, o Bala: “O que é clan?”.","Ele demorou a explicar e eu, muito brincalhona, me antecipei e disse: “Tá vendo essa salinha aqui? É como um clan: todo mundo joga sempre junto. Na verdade, isso aqui é uma ‘MaFia’!” — momento histórico… rs.","Nossos amigos de todas as noites acharam engraçada a palavra que usei para explicar ao menino o que seria um clan. Desse dia em diante, começamos a nomear as salinhas de MaFia.","Todos os dias marcávamos presença à noite, brincávamos muito uns com os outros, trocando ideias, receitas e piadas."]},{"title":"Nosso cantinho no Orkut","paragraphs":["Aí fiz a comunidade no Orkut, que para mim foi de grande importância. Apesar de termos vários outros meios de comunicação entre a guild — TeamSpeak, Facebook, fórum, entre outros —, a comunidade é o marco e o ponto de referência desde o início.","Lá encontramos todos, os velhos e os novos membros. Na hora do sufoco, é lá que procuram socorro. E não era como as demais: era um cantinho para a gente se conhecer, para diversão e lazer. Às vezes até saíam umas briguinhas, mas coisas de irmãos."]},{"title":"2006: as primeiras letras MF","paragraphs":["Finalmente chegou um dia em que ganhamos 30 cookies no final do ano, presente de Natal do Pangya. O que fizemos? Colocamos MF na frente dos nicks, e foi fundada a MF como clan de fato.","Isso foi em 2006. Era tudo muito precário: não existia opção para fazer guild no site. A gente improvisava assim as equipes, apenas com as letras do clan. Alguns aderiram, outros não.","Os primeiros a mudar o nick foram MF_htinha, MF_Duracell e MF_Minharro. Outros vieram depois."]},{"title":"De Mafia BR a -[MF]-MaFia","paragraphs":["Quando passamos para o Albatross18, fui e fiz a guild no site. A princípio, foi criada com o nome Mafia BR.","Mas houve uma época em que existia uma certa perseguição aos BRs no Albatross18. Bastava ter BR no nome da guild para ser quicado da sala; guilds inteiras eram eliminadas. Sabemos bem que motivos eles tinham, mas acabavam por generalizar todos.","Chegamos então a um consenso: seria melhor para a equipe mudar o nome da guild, mas sem perder a identidade. Deixamos em aberto para sugestões e fizemos uma votação por meio de enquete. O nome escolhido foi -[MF]-MaFia."]},{"title":"Muito mais que duas letras no nick","paragraphs":["A união e a amizade que o grupo tem entre si sempre vieram em primeiro lugar. Fazer parte da equipe não é apenas ter duas letras ou um desenho na frente do seu nick, não é apenas ter status. É muito mais que isso: é ser amigo, parceiro, cúmplice, confiável, respeitador, entre outras coisas…","Quem faz parte dessa família há mais de um ano já sabe bem disso. Desde o nascimento dessa grande família, pessoas de grande valor marcaram presença.","Alguns dividiram a liderança, como Duracell, Dr.Minharro e DJ_JaBa, além de André♥Mirian e Landão, citados como líderes na época deste relato. Todos tiveram participação fundamental em cada fase da história dessa guild.","Passamos por muitas coisas ao longo desses anos. Temos muitas histórias: fizemos confrontos, eventos internos valendo prêmios e tivemos guild nos Pangya BR, Albatross18, Pangya TH — montada por André♥Mirian — e Pangya USA.","Até casamento teve na guild, em forma de evento! Muitas pessoas passaram pela MF e outras tantas têm vontade de participar. Já fomos copiados, xingados, elogiados, odiados e amados."]},{"title":"Quando a amizade saiu das telas","paragraphs":["O que mais marcou foi poder conhecer uma grande parte dessa equipe pessoalmente, em um encontro pré-marcado em Cotia, SP. Fizemos um grande churrasco no Parque Cemucam e todos foram para lá com suas famílias e camisetas personalizadas.","Foi uma emoção muito grande poder conhecê-los pessoalmente, compartilhar um dia de lazer, trocar ideias, conhecer suas famílias e, claro, registrar tudo… rsrs.","Gostamos tanto que fizemos o II Encontro em Itaquera, no Parque do Carmo. Vieram outras pessoas, de cidades afastadas, que tiveram todo o apoio dos amigos da própria guild. No fim, tudo deu certo e foi maravilhoso também.","Pretendemos fazer outros mais, e me sinto muito orgulhosa dessa amizade sólida que construímos. Sei que, com isso, nossa amizade e união só vieram a se fortalecer. Enfim, podemos falar com toda convicção: -[MF]-MaFia, mais que uma guild, uma família."]}];
    chapters.forEach((chapter, i) => {
      const section = node('section', 'guild-history-chapter'); section.id = 'mf-capitulo-' + (i + 1); section.tabIndex = -1;
      section.append(node('p', 'guild-history-number', String(i + 1).padStart(2, '0')), node('h3', '', chapter.title));
      chapter.paragraphs.forEach(text => section.append(node('p', '', text))); article.append(section);
      const jump = node('button', 'guild-history-jump', chapter.title); jump.type = 'button';
      jump.addEventListener('click', () => { section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' }); section.focus({ preventScroll: true }); }); index.append(jump);
    });
    const signature = node('footer', 'guild-history-signature'); signature.append(node('strong', '', '-[MF]-MaFia'), node('p', '', '“Uma Família”'), node('span', '', 'By: MF Lenne')); article.append(signature); layout.append(index, article); root.append(layout);
    const album = node('aside', 'guild-history-album'), link = node('a', 'guild-history-album-cover'); link.href = '#pangya/fotos'; link.setAttribute('aria-label', 'Ver fotos dos encontros da guild');
    const image = node('img'); image.src = './assets/fotos/encontro-mafia-2013/foto-02.jpg'; image.alt = 'Foto coletiva do Encontro da MaFia 2013 em São Carlos, SP.'; image.loading = 'lazy'; link.append(image);
    const copy = node('div'); copy.append(node('p', 'eyebrow', 'NO ACERVO DE L3ND4 GAMES'), node('h3', '', 'As lembranças também têm imagem.'), node('p', '', 'Revisite os registros dos encontros. No acervo: Encontro da MaFia 2013, em São Carlos, SP.'));
    const action = node('a', 'secondary', 'Ver fotos dos encontros ↗'); action.href = '#pangya/fotos'; copy.append(action); album.append(link, copy); root.append(album);
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
    const details = [[validId(video.youtubeId) ? (video.dateType === 'publication' ? 'Data de publicação' : 'Data da jogatina') : 'Data ilustrativa do exemplo', dateLabel(video.date)], ['Personagem / deck', video.character], ['Mapa / modo', video.map], ['Servidor / versão', video.server]];
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
    const hasExamples = list.some(v => !validId(v.youtubeId)); $('library-demo').hidden = !hasExamples;
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
      const date = dateLabel(v.date); if (date) { const time = node('time', 'memory-date', (real ? (v.dateType === 'publication' ? 'Publicado em ' : '') : 'Data ilustrativa · ') + date); time.dateTime = v.date; card.append(time); }
      card.addEventListener('click', () => openPlayer(v)); $('video-grid').append(card);
    });
  }
  function route() {
    const requested = location.hash.slice(1) || 'home';
    let memory; if (requested.startsWith('memoria=')) { try { memory = videos.find(v => v.id === decodeURIComponent(requested.slice(8))); } catch {} }
    // #videos is an anchor on Home; game routes remain shareable on GitHub Pages.
    const current = ['pangya/fotos', 'pangya/videos', 'pangya/historia', 'fotos'].includes(requested) ? 'pangya' : navigation.some(([key]) => key === requested) ? requested : 'home';
    const pangyaPhotos = current === 'pangya' && ['pangya/fotos', 'fotos'].includes(requested);
    const pangyaHistory = current === 'pangya' && requested === 'pangya/historia';
    const liveOnly = current === 'lives'; const calculatorOnly = current === 'calculadora-s4'; const category = games[current];
    $('hero').hidden = current !== 'home'; $('games-section').hidden = current !== 'home'; $('videos').hidden = liveOnly || calculatorOnly || pangyaPhotos || pangyaHistory;
    $('lives-section').hidden = Boolean(category) || calculatorOnly;
    $('game-page').hidden = !category; $('calculator-page').hidden = !calculatorOnly;
    if (category) showGamePage(current, pangyaHistory ? 'historia' : pangyaPhotos ? 'fotos' : 'videos');
    $('guild-history').hidden = !pangyaHistory;
    const gallery = $('photos-page'); if (gallery) gallery.hidden = !pangyaPhotos;
    $('filters').hidden = Boolean(category);
    $('library-title').textContent = category ? 'Vídeos de ' + category.name : 'O arquivo das minhas jogatinas';
    $('library-eyebrow').textContent = category ? 'ACERVO · ' + category.name.toUpperCase() : 'MEU ACERVO / CADA PLAY, UMA HISTÓRIA';
    active = category ? current : 'all';
    document.querySelectorAll('#nav a').forEach(a => { if (a.dataset.route === current) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current'); });
    document.title = `${category ? category.name + (current === 'pangya' ? pangyaHistory ? ' · História da MF' : pangyaPhotos ? ' · Fotos' : ' · Vídeos' : ' · Vídeos') : calculatorOnly ? 'Calculadora S4' : liveOnly ? 'Lives' : 'Início'} | L3ND4 GAMES`;
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
  $('year').textContent = new Date().getFullYear(); window.addEventListener('hashchange', route); setupArchive(); setupGuildHistory(); setupCalculator(); setupTwitch(); route();
})();
