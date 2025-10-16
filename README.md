# Newsletter Studio

Aplicação simples para criar e testar newsletters em HTML com apoio da API da OpenAI, protegendo sua chave atrás de um backend Node.js.

## O que fazer agora (passo a passo)

### 1. Gerar (ou reutilizar) uma chave da OpenAI

1. Acesse [https://platform.openai.com/api-keys](https://platform.openai.com/api-keys).
2. Clique em **Create new secret key** e copie o valor (ele começa com `sk-`).
3. Guarde-o temporariamente: você vai colar no arquivo `.env`. Depois de testar você pode revogar ou gerar outro token.

> ⚠️ **Importante:** nunca envie essa chave para o GitHub ou para terceiros. Use-a apenas nas suas máquinas/servidores.

### 2. Instalar dependências

O projeto já está preparado para ambientes Node 16 ou superiores. Rode:

```bash
npm install
```

### 3. Configurar o arquivo `.env`

1. Copie `.env.example` para `.env`.
2. Dentro do `.env`, substitua `coloque_sua_chave_aqui` pela chave criada no passo 1.
3. Opcional: ajuste a porta se quiser rodar em outra (padrão 3000).

```env
OPENAI_API_KEY=sk-seu_token_aqui
PORT=3000
```

> ✅ Depois dos testes, volte no painel da OpenAI e clique em **Revoke** para desativar a chave, se desejar.

### 4. Rodar o servidor localmente

```bash
npm start
```

Acesse [http://localhost:3000](http://localhost:3000) para abrir o Newsletter Studio.

### 5. Fluxo dentro da interface

1. Clique em **📝 Texto → HTML** se quiser converter texto puro em um layout de newsletter.
2. Clique em **✨ Melhorar** para enviar o HTML atual e receber uma versão aprimorada.
3. Use **💾 Salvar** para guardar sua newsletter no navegador e **⬇️ Download** para baixar o HTML final.

A chave fica protegida no backend (`server.js`), então é seguro subir esse projeto para a Hostinger ou outro provedor. Em ambientes com Node 18+, o `fetch` nativo é usado; em versões anteriores o pacote `node-fetch` é carregado automaticamente.

### 6. Publicar na Hostinger (resumo rápido)

1. Faça upload de todos os arquivos do repositório para seu host.
2. Configure variáveis de ambiente no painel da Hostinger adicionando `OPENAI_API_KEY` com sua chave (não comite em arquivo).
3. Aponte o start command para `npm start`.
4. Reinicie a aplicação e teste via HTTPS do seu domínio. Depois, se quiser, revogue a chave usada.

## Scripts úteis

- `npm start` — inicia o servidor em produção.
- `npm run dev` — inicia com `nodemon` para recarregar automaticamente durante o desenvolvimento.

## Estrutura

```
├── public/          # arquivos estáticos (front-end)
├── server.js        # API Express que faz proxy para a OpenAI
├── .env.example     # modelo de configuração de ambiente
└── package.json
```

Sinta-se livre para adaptar os prompts das chamadas à IA em `server.js` conforme a necessidade das suas campanhas.
