/* CONFIGURAÇÃO DO PORTAL
 * Não coloque senhas, tokens ou chaves aqui: este arquivo é público.
 * youtubeId: somente os 11 caracteres após v= ou youtu.be/.
 * Deixe vazio enquanto não houver vídeo real. Nenhum canal foi inventado.
 * Datas da jogatina no formato AAAA-MM-DD. Remova ou substitua os exemplos.
 * Campos opcionais de memória: character, map, server, memory, screenshot, screenshotCaption.
 * Use IDs únicos e estáveis: eles identificam o link direto de cada memória.
 * game: pangya | yugioh
 */
window.PORTAL_CONFIG = {
  archive: {
    title: "Minhas jogatinas. Minhas memórias.",
    description: "Um lugar para guardar as partidas, os duelos e as aventuras que fizeram parte da minha história. Cada vídeo, uma lembrança. Cada jogo, um capítulo.",
    about: "Este é o meu acervo pessoal de jogos. Aqui eu reúno minhas jogatinas e os momentos que quero poder revisitar, compartilhar e lembrar daqui a muitos anos."
  },
  // Artes temáticas dos jogos, separadas das suas capturas pessoais.
  // Você pode substituir image por um arquivo seu, ex.: ./assets/meu-pangya.jpg.
  artwork: {
    pangya: { image: "./assets/pangya.jpg", icon: "./assets/icon-pangya.svg", credit: "Pangya / Ntreev · wallpaper temático", source: "https://www.pangyabrasil.net/" },
    yugioh: { image: "./assets/yugioh.jpg", icon: "./assets/icon-yugioh.svg", credit: "Yu-Gi-Oh! Master Duel / KONAMI · arte temática", source: "https://store.playstation.com/en-us/concept/10001481" }
  },
  calculatorS4: {
    downloadUrl: "", // Cole aqui seu link HTTPS real de download. Vazio = em breve.
    version: "", // Opcional: versão real do arquivo.
    fileSize: "", // Opcional: tamanho real do arquivo.
    description: "O espaço da Calculadora S4 no L3ND4 GAMES. O arquivo para download será disponibilizado por aqui.",
    instructions: ["Quando o download estiver disponível, use o botão desta página.", "Após baixar, siga as instruções que acompanham o arquivo."]
  },
  twitch: {
    channel: "", // Seu login Twitch, sem @ e sem URL. Vazio = placeholder.
    embed: true, // false = somente link para assistir na Twitch.
    parents: [] // Opcional: outros DOMÍNIOS autorizados, sem https ou caminho.
  },
  videos: [
    {
      "id": "pangya-west-wiz-ATrUri40M70",
      "game": "pangya",
      "title": "-38 west wiz MF(e37)L3ND4 pangya usa",
      "description": "Jogatina de Pangya no West Wiz com MF(e37)L3ND4, resultado -38, no servidor U.S.A. Vídeo publicado em 29 de dezembro de 2012.",
      "youtubeId": "ATrUri40M70",
      "date": "2012-12-29",
      "duration": "",
      "tags": [
        "West Wiz",
        "gameplay",
        "-38",
        "Pangya USA"
      ],
      "character": "MF(e37)L3ND4",
      "map": "West Wiz",
      "server": "U.S.A",
      "memory": "",
      "dateType": "publication"
    },
    {
      "id": "pangya-blue-lagoon-2012-12-27",
      "game": "pangya",
      "title": "-40 Blue Lagon MF(e37)L3ND4",
      "description": "Jogatina de Pangya no Blue Lagoon com MF(e37)L3ND4, resultado -40. Vídeo publicado em 27 de dezembro de 2012.",
      "youtubeId": "DTcHu81bbgY",
      "date": "2012-12-27",
      "dateType": "publication",
      "duration": "",
      "tags": [
        "Blue Lagoon",
        "Blue Lagon",
        "gameplay",
        "-40"
      ],
      "character": "MF(e37)L3ND4",
      "map": "Blue Lagoon",
      "server": "",
      "memory": ""
    },
  {
  id: "pangya-ice-spa-2023-07-06",
  game: "pangya",
  title: "MF(e37)Lenda -47 ice spa FAIL -49",
  description: "Jogatina de Pangya no Ice Spa, gravada em 6 de julho de 2023 no servidor U.S.A.",
  youtubeId: "0zJFmsLHgHo",
  date: "2023-07-06",
  duration: "",
  tags: ["Ice Spa", "gameplay", "-47", "FAIL -49"],
  character: "MF(e37)Lenda",
  map: "Ice Spa",
  server: "U.S.A",
  memory: ""
},
    { id: "exemplo-2", game: "yugioh", title: "Uma carta pode mudar tudo", description: "Exemplo de duelo de Yu-Gi-Oh! Adicione o ID de um vídeo seu para ativar o player.", youtubeId: "", date: "2026-01-05", duration: "EXEMPLO", tags: ["duelo", "deck"] },
    { id: "exemplo-5", game: "yugioh", title: "Testando novas estratégias", description: "Exemplo de vídeo sobre estratégias. Substitua pelo seu conteúdo.", youtubeId: "", date: "2026-01-02", duration: "EXEMPLO", tags: ["estratégia", "deck"] }
  ]
};
