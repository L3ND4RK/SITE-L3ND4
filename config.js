/* CONFIGURAÇÃO DO PORTAL
 * Não coloque senhas, tokens ou chaves aqui: este arquivo é público.
 * youtubeId: somente os 11 caracteres após v= ou youtu.be/.
 * Deixe vazio enquanto não houver vídeo real. Nenhum canal foi inventado.
 * Datas da jogatina no formato AAAA-MM-DD. Remova ou substitua os exemplos.
 * Campos opcionais de memória: character, map, server, memory, screenshot, screenshotCaption.
 * Use IDs únicos e estáveis: eles identificam o link direto de cada memória.
 * game: pangya
 */
window.PORTAL_CONFIG = {
  archive: {
    title: "Minhas jogatinas. Minhas memórias.",
    description: "Um lugar para guardar as tacadas, os encontros e as aventuras que fizeram parte da minha história. Cada vídeo, uma lembrança. Pangya, muitos capítulos.",
    about: "Este é o meu acervo pessoal de Pangya. Aqui eu reúno minhas jogatinas e os momentos que quero poder revisitar, compartilhar e lembrar daqui a muitos anos."
  },
  // Artes temáticas dos jogos, separadas das suas capturas pessoais.
  // Você pode substituir image por um arquivo seu, ex.: ./assets/meu-pangya.jpg.
  artwork: {
    pangya: { image: "./assets/pangya-mf-banner.jpg", icon: "./assets/icon-pangya.svg", credit: "Arte temática criada com IA para L3ND4 GAMES · marca MF fornecida pelo acervo", source: "" },
  },
  // Dicas reais: adicione itens como { title: "Título", content: "Sua dica" }.
  tips: [],
  calculatorS4: {
    downloadUrl: "", // Cole aqui seu link HTTPS real de download. Vazio = em breve.
    version: "", // Versão real do arquivo.
    compatibility: "", // Servidor ou versão do Pangya compatível, quando confirmado.
    fileSize: "", // Opcional: tamanho real do arquivo.
    description: "Ferramentas para acompanhar seus estudos e treinos no Pangya. Consulte aqui o arquivo, a versão e as instruções quando o download estiver disponível.",
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
      "title": "West Wiz −38",
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
      "title": "Blue Lagoon −40",
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
  title: "Ice Spa −47 | tentativa de −49",
  description: "Jogatina de Pangya no Ice Spa, no servidor U.S.A. Vídeo publicado em 6 de julho de 2013.",
  youtubeId: "0zJFmsLHgHo",
  date: "2013-07-06",
  dateType: "publication",
  duration: "",
  tags: ["Ice Spa", "gameplay", "-47", "FAIL -49"],
  character: "MF(e37)Lenda",
  map: "Ice Spa",
  server: "U.S.A",
  memory: ""
},
  ]
};
