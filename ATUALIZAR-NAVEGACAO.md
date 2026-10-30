# Pangya: Fotos e Vídeos

A navegação fica assim:

- **Pangya** abre primeiro **Vídeos**, com **Fotos** e **História da MF** ao lado.
- A **Calculadora S4** continua no menu principal e tem um atalho dentro de Pangya.
- **Lives** e a Home continuam disponíveis.

A galeria de fotos deixa de ter uma entrada separada no menu principal. Ela passa a fazer parte de Pangya, junto com o acervo de vídeos. As apresentações dos jogos foram reduzidas a um cabeçalho compacto para destacar seu conteúdo.

## Atualizar seu site no GitHub

1. Extraia `l3nd4-pangya-fotos-videos.zip`.
2. Envie estes quatro arquivos para a raiz do repositório, substituindo os anteriores quando houver: **app.js**, **fotos.js**, **fotos.css** e **acervo.css**. Salve em **Commit changes**.
3. Se você JÁ tem `fotos-config.js`, mantenha o seu arquivo com os álbuns cadastrados. O modelo do pacote tem outro nome justamente para não substituí-lo.
4. Se você AINDA NÃO tem `fotos-config.js`, renomeie `fotos-config.MODELO.js` para **fotos-config.js** e envie à raiz do repositório.
5. Confira se o seu `index.html` já contém a linha abaixo. Se não contiver, acrescente-a logo antes de `</body>` e salve. Ela deve aparecer apenas uma vez, depois do carregamento de `app.js`:

```html
<script defer src="./fotos.js"></script>
```

6. Espere a publicação no GitHub Pages e atualize seu site com **Ctrl + F5**.

Não substitua `config.js`, seu avatar, o arquivo `index.html` inteiro, as fotos de `assets`. Esta atualização usa as personalizações que você já tem.

## Endereços internos

- `#pangya`: abre Vídeos de Pangya.
- `#pangya/fotos`: abre Fotos de Pangya diretamente.
- `#pangya/videos`: abre Vídeos de Pangya.
- O endereço antigo `#fotos` continua abrindo Fotos de Pangya.

## Cadastrar o acervo

As fotos continuam em **fotos-config.js**, na lista `photos`. Use álbuns com nomes como “Capturas do jogo” ou o nome real de um encontro que você queira guardar. O campo `album` cria os filtros automaticamente. Para detalhes de cadastro, consulte `INSTALAR-FOTOS.md` do pacote anterior; o cadastro é o mesmo, mas agora as fotos ficam dentro de Pangya.

Os vídeos continuam em **config.js**, na lista `videos`. O valor de `game` define a biblioteca: `pangya`. O filtro geral de jogos fica na Home; dentro de cada jogo, aparecem somente os vídeos daquele jogo.

O acervo inclui o álbum Encontro da MaFia 2013 e a História da MF, com relato de MF Lenne.
