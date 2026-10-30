# Fotos dos encontros da guild

## Ativar no site que já está online

1. Extraia o pacote `l3nd4-aba-fotos.zip`.
2. No GitHub, envie `fotos.js`, `fotos.css` e `fotos-config.js` para a raiz do repositório, junto de `index.html`. Salve em **Commit changes**.
3. Abra o seu `index.html` no GitHub e clique no lápis. Logo acima de `</body>`, adicione apenas uma vez:

```html
<script defer src="./fotos.js"></script>
```

4. Salve em **Commit changes**. Após a publicação, atualize com **Ctrl + F5**. A aba **Fotos** aparecerá no menu e um card **Fotos da guild** aparecerá na Home.

Não precisa substituir suas configurações de vídeos, avatar, fotos dos jogos. O código-fonte completo local já inclui o script no `head`; se estiver usando esse arquivo, não o adicione de novo.

## Colocar as fotos

No computador, crie `fotos` dentro da pasta `assets`. Coloque as fotografias ali, com nomes simples como `encontro-01.jpg`. Envie a pasta `fotos` pelo GitHub **de dentro da pasta assets**, para o caminho final ficar `assets/fotos/encontro-01.jpg`.

Em `fotos-config.js`, preencha `guildName` com o nome da guild, se quiser. Na lista `photos`, acrescente um bloco para cada foto:

```js
{
  id: "encontro-01-foto-01",
  src: "./assets/fotos/encontro-01.jpg",
  title: "Título que você escolher",
  album: "Nome que você der ao encontro",
  date: "",       // Pode informar só o ano. Deixe vazio se não souber.
  location: "",   // Cidade ou local, opcional.
  caption: "",    // Escreva a lembrança desse momento.
  alt: ""         // Descrição breve do que aparece na imagem, opcional.
}
```

Coloque uma vírgula entre os blocos. Fotos com o mesmo `album` aparecem juntas no filtro. Os textos são livres: não é necessário inventar datas ou locais que você não lembra. O campo `thumbnail` é opcional e pode apontar para uma cópia menor da foto; a imagem ampliada continua usando `src`.

Use JPG, PNG ou WebP reais, com a extensão correta. Não basta trocar o nome de PNG para JPG. Preserve suas fotos originais em uma cópia própria; para o site, cópias menores ajudam no carregamento. Os caminhos e os nomes dos arquivos precisam coincidir, inclusive maiúsculas e minúsculas.

O site publicado é público: escolha fotos, legendas e nomes que você e as pessoas retratadas estejam confortáveis em compartilhar. Você não precisa incluir nomes completos ou dados pessoais nas legendas.

## Como funciona

A galeria cria os filtros a partir dos álbuns que você preencher. A busca encontra título, encontro, data, local e legenda. Um clique abre a foto ampliada. Use **Anterior**, **Próxima** ou as setas do teclado para navegar nas fotos do filtro atual; **Esc** fecha. Fotos horizontais e verticais se adaptam ao layout.

Sem fotos cadastradas, aparece uma apresentação do acervo vazio. Imagens que não carregam mostram uma mensagem em vez de deixar o visitante sem informação. Não há envio de fotos pelo site ou painel administrativo nesta versão; a inclusão é feita pelo GitHub.

## Atualizações futuras

Depois da instalação inicial, basta enviar as novas fotos e editar `fotos-config.js`. Não substitua esse arquivo pelo modelo vazio quando já tiver seus álbuns cadastrados.
