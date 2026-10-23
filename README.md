# Estúdio Augusto Fonte

Página-hub dos cursos de Augusto Fonte: **Como Eu Faço Criativos** e **Motion Graphics com Claude**, com espaço para os próximos.

Site estático (HTML + CSS + JS, sem build). Abra `index.html` ou publique pelo GitHub Pages.

## Como adicionar um curso ou aula

Tudo vem de **`courses.js`**. Cards, números do topo, aulas, processo, preços e FAQ se montam sozinhos.

1. Copie um bloco de curso em `window.COURSES`, mude o `id` e preencha.
2. `status: "aberto"` mostra o curso completo; `status: "em-breve"` mostra um card de aviso.
3. Nova aula: adicione `{ title, dur: "mm:ss", sum, points: [...] }` dentro de um módulo.
4. Link de compra: preencha `checkout` do curso. Enquanto estiver vazio, o botão leva ao Instagram.
5. Vídeos e imagens novos vão em `assets/`.

## Arquivos
- `index.html` estrutura · `style.css` visual · `app.js` monta a página · `courses.js` conteúdo
- `assets/` fontes (PolySans), vídeos e imagens
