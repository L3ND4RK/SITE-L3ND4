# L3ND4 GAMES

Portal gamer estático em português, responsivo, dark roxo e azul neon. HTML, CSS e JavaScript puro, sem instalação de dependências ou etapa de compilação.

## Abrir e personalizar

Abra `index.html` no navegador para navegar pela demonstração. Para testar a Twitch, sirva a pasta com um servidor local (por exemplo, `python -m http.server 8080`) e abra `http://localhost:8080`. Não há login, banco de dados, painel administrativo ou sincronização automática com as plataformas nesta versão.

Todas as entradas ficam em `config.js`. Edite o arquivo em um editor de texto. Os seis cards iniciais são exemplos, com IDs vazios: nenhum vídeo ou canal real foi inventado. Substitua os exemplos ou deixe `videos: []` para iniciar sem cards.

Exemplo de estrutura de um item (substitua os valores antes de publicar):

```js
{
  id: "meu-video-01",              // identificador único de sua escolha
  game: "pangya",                 // pangya, yugioh, mu ou outros
  title: "Título do seu vídeo",
  description: "Descrição do seu vídeo",
  youtubeId: "",                  // insira o ID real de 11 caracteres
  date: "2026-10-26",             // AAAA-MM-DD; usada na ordenação
  duration: "",                   // duração real opcional, ex.: 12:30
  tags: ["gameplay", "golf"]
}
```

Copie apenas o ID do YouTube, não a URL completa: o trecho após `v=` ou após `youtu.be/`, sem parâmetros extras. O player usa YouTube com domínio de privacidade aprimorada e só é criado ao abrir o card. Vídeos privados, removidos, com restrição de idade ou que não permitem incorporação podem não tocar; o modal oferece um link para o YouTube. A duração e a data são manuais. Miniaturas são carregadas do YouTube quando há um ID válido; os exemplos usam arte tipográfica local.

Em `twitch.channel`, coloque seu login real, sem `@` e sem URL. O domínio atual entra automaticamente no parâmetro `parent`; `parents` permite adicionar domínios extras, sem protocolo ou caminho. No GitHub Pages de projeto, o domínio é o host (sem o nome do repositório). A Twitch usa HTTPS em produção. Clique em “Carregar player da Twitch” para iniciar a conexão. `embed: false` mantém somente o link do canal. O site não afirma que você está ao vivo: o status real é exibido pela própria Twitch. Não há chat incorporado nesta versão.

## Publicar no GitHub Pages, sem terminal

1. Entre no GitHub e crie um repositório, por exemplo `l3nd4-games`. Use público para a opção gratuita comum do Pages.
2. Abra **Add file → Upload files** e envie o CONTEÚDO desta pasta: `index.html`, `style.css`, `app.js`, `config.js`, `.nojekyll` e a pasta `assets`. `index.html` deve ficar na raiz do repositório, não dentro de uma pasta `l3nd4-games`. Extraia o ZIP antes: enviar apenas o ZIP não publica o site. Se o seletor ocultar `.nojekyll`, crie um arquivo vazio com esse nome pelo GitHub.
3. Salve em **Commit changes** na branch `main`.
4. Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, branch **main**, pasta **/(root)** e salve.
5. Aguarde a conclusão da publicação. A própria tela Pages mostrará o endereço verdadeiro. Não há URL de site publicada nesta entrega.
6. Para atualizar vídeos, edite `config.js` no repositório e salve um novo commit. O Pages republica as alterações.

Os nomes de opções podem variar com o idioma e a interface do GitHub. Consulte a documentação oficial: https://docs.github.com/pt/pages/getting-started-with-github-pages/creating-a-github-pages-site

Todos os caminhos de arquivos são relativos (`./`), compatíveis com repositórios de projeto e domínios próprios. As abas usam fragmentos (`#pangya`, `#yugioh`, `#mu`, `#outros`, `#lives`), portanto abrir links internos diretamente não depende de rotas de servidor.

Em telas com espaço inferior a 400 px para o player, a seção orienta a abrir o canal na Twitch, respeitando o tamanho mínimo exigido para incorporação. Referência: https://dev.twitch.tv/docs/embed/video-and-clips/

## Arquivos

- `index.html`: estrutura, textos e modal.
- `style.css`: cores, tipografia e layouts de celular e desktop.
- `config.js`: vídeos e canal Twitch; este arquivo é público, nunca inclua segredos.
- `app.js`: navegação, pesquisa sem distinção de acentos, filtros, ordenação e players.
- `assets/mark.svg`: símbolo original do portal, sem imagens ou marcas de jogos de terceiros.
- `.nojekyll`: permite servir os arquivos diretamente no Pages.

## Comportamento e limites

A busca combina título, descrição, jogo e tags e pode ser usada junto com filtros. `/` foca a busca. `Esc` fecha o player e a reprodução é interrompida. Cards sem ID válido abrem uma mensagem de exemplo, sem tentar carregar um vídeo aleatório. Navegação por teclado, indicação do filtro ativo, contador anunciado, redução de movimento e link para pular ao conteúdo estão incluídos.

Google Fonts fornece Inter e Barlow Condensed; sem internet, fontes locais substitutas são utilizadas. YouTube e Twitch exigem conexão e podem ter regras próprias de cookies e reprodução. O site não usa ferramentas de análise. Integrações externas recebem dados de conexão quando seus recursos são carregados; avalie os avisos de privacidade apropriados ao seu público antes de publicar.


## Abas personalizadas e Calculadora S4

Pangya, Yu-Gi-Oh! e MU Online possuem apresentação, cores e detalhes próprios, com referências dos jogos nas páginas. O botão Ver vídeos mantém a biblioteca do jogo selecionado. A Home mantém acesso a Outros jogos e inclui um card para a Calculadora S4.

A aba `#calculadora-s4` é uma central de download, sem cálculos dentro do site. Em `config.js`, edite `calculatorS4.downloadUrl` e coloque seu link HTTPS real. Enquanto estiver vazio ou inválido, o botão fica desativado com Download em breve. Campos `version`, `fileSize`, `description` e `instructions` são opcionais e editáveis. Links para páginas de hospedagem abrem em nova aba; o navegador pode abrir uma página intermediária em vez de baixar diretamente.

### Atualizar o site que já está no GitHub

Extraia o novo ZIP e substitua `index.html`, `style.css`, `app.js` e `config.js` no repositório. Antes de substituir `config.js`, copie seus IDs de vídeos e canal Twitch já configurados para a nova versão. A pasta `assets` e `.nojekyll` continuam necessários. Salve em Commit changes e aguarde o GitHub Pages republicar. Esta entrega atualiza os arquivos locais; não altera seu repositório automaticamente.
