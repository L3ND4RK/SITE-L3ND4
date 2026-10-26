/* CONFIGURAÇÃO DO PORTAL
 * Não coloque senhas, tokens ou chaves aqui: este arquivo é público.
 * youtubeId: somente os 11 caracteres após v= ou youtu.be/.
 * Deixe vazio enquanto não houver vídeo real. Nenhum canal foi inventado.
 * Datas no formato AAAA-MM-DD. Remova ou substitua todos os exemplos.
 * game: pangya | yugioh | mu | outros
 */
window.PORTAL_CONFIG = {
  twitch: {
    channel: "", // Seu login Twitch, sem @ e sem URL. Vazio = placeholder.
    embed: true, // false = somente link para assistir na Twitch.
    parents: [] // Opcional: outros DOMÍNIOS autorizados, sem https ou caminho.
  },
  videos: [
    { id: "exemplo-1", game: "pangya", title: "Em busca da tacada perfeita", description: "Exemplo de gameplay de Pangya. Substitua pelo título e descrição do seu vídeo.", youtubeId: "", date: "2026-01-06", duration: "EXEMPLO", tags: ["gameplay", "golf"] },
    { id: "exemplo-2", game: "yugioh", title: "Uma carta pode mudar tudo", description: "Exemplo de duelo de Yu-Gi-Oh! Adicione o ID de um vídeo seu para ativar o player.", youtubeId: "", date: "2026-01-05", duration: "EXEMPLO", tags: ["duelo", "deck"] },
    { id: "exemplo-3", game: "mu", title: "A jornada para o próximo level", description: "Exemplo de aventura em MU Online. Este card ainda não possui vídeo.", youtubeId: "", date: "2026-01-04", duration: "EXEMPLO", tags: ["rpg", "aventura"] },
    { id: "exemplo-4", game: "pangya", title: "Só mais uma rodada", description: "Exemplo de vídeo de Pangya. Personalize este conteúdo em config.js.", youtubeId: "", date: "2026-01-03", duration: "EXEMPLO", tags: ["gameplay", "rodada"] },
    { id: "exemplo-5", game: "yugioh", title: "Testando novas estratégias", description: "Exemplo de vídeo sobre estratégias. Substitua pelo seu conteúdo.", youtubeId: "", date: "2026-01-02", duration: "EXEMPLO", tags: ["estratégia", "deck"] },
    { id: "exemplo-6", game: "outros", title: "Um novo jogo. Outra história.", description: "Espaço de exemplo para outros jogos do canal.", youtubeId: "", date: "2026-01-01", duration: "EXEMPLO", tags: ["descobertas", "gameplay"] }
  ]
};
