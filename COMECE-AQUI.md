# Seu acervo L3ND4 GAMES

## Colocar a nova aparência no site

1. Extraia o ZIP.
2. Guarde uma cópia do `config.js` que você já usa, caso tenha colocado vídeos, canal ou link da Calculadora S4.
3. Envie ao repositório os novos `index.html`, `style.css`, `app.js`, `config.js` e TODOS os arquivos de `assets/`. Os arquivos devem substituir os de mesmo nome; não envie apenas o ZIP.
4. Recoloque seus dados reais na nova configuração, se necessário.
5. Confirme em **Commit changes** e aguarde a publicação do Pages. Atualize seu site com Ctrl + F5.

## Guardar uma jogatina

Em `config.js`, cada item de `videos` é uma entrada do acervo. Substitua um exemplo ou acrescente outro item seguindo esta estrutura:

```js
{
  id: "minha-partida-01",
  game: "pangya",                 // somente pangya
  title: "Título da minha jogatina",
  description: "O que aconteceu nesta partida",
  youtubeId: "",                  // Coloque aqui o ID real de 11 caracteres
  date: "",                       // Data da partida, no formato AAAA-MM-DD
  duration: "",                   // Opcional: duração real
  tags: [],
  character: "",                  // Personagem ou deck que você usou
  map: "",                        // Mapa, campo ou modo de jogo
  server: "",                     // Servidor ou versão
  memory: "",                     // Sua lembrança pessoal desta jogatina
  screenshot: "",                 // Ex.: ./assets/minha-partida.jpg
  screenshotCaption: ""           // Legenda da captura
}
```

Use vírgula entre os itens. Mantenha o `id` único e não o altere depois de compartilhar o link da memória. Campos opcionais podem ficar vazios.

Para colocar uma captura pessoal, envie também a imagem para `assets/` e escreva seu caminho em `screenshot`. Os arquivos e os textos publicados no repositório público podem ser vistos por qualquer pessoa.

## Colocar o download da Calculadora S4

Preencha `calculatorS4.downloadUrl` com seu link HTTPS real. Até isso acontecer, a página mostrará **Download em breve**.

## Conservar as lembranças

O site reúne os registros; os vídeos continuam hospedados no YouTube. Guarde também os vídeos originais e as capturas em cópias próprias. Assim você pode recuperar o acervo se um link ou serviço deixar de funcionar.
