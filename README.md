# Game Boy Pro Edition - Multi! 🎮

Um console retrô estilo **Game Boy**, feito como **aplicação offline em arquivo único**.

O projeto roda diretamente no navegador a partir do `index.html`, sem backend, sem banco de dados, sem API, sem servidor obrigatório e sem etapa de build. Basta abrir o arquivo e jogar.

## ✅ Natureza do Projeto

- **Arquivo principal:** `index.html`
- **Execução:** local/offline, direto no navegador
- **Arquitetura:** single-file app
- **Backend:** não possui
- **API:** não possui
- **Dependências externas obrigatórias:** não possui
- **Build/compilação:** não necessário

## 🚀 Funcionalidades

- **Múltiplos jogos:** seleção de jogos clássicos integrados.
- **Design responsivo:** funciona em dispositivos móveis e desktop.
- **Controles em tela:** interface visual inspirada no Game Boy clássico.
- **Acessibilidade:** inclui modo de alto contraste e suporte a navegação por teclado.
- **Visual retrô:** estética baseada no Game Boy com renderização pixelada.
- **Uso offline:** ideal para baixar, abrir e executar sem conexão.

## ▶️ Como Executar

### Opção 1 — Execução direta

1. Baixe ou clone o repositório.
2. Abra o arquivo `index.html` no navegador.
3. Jogue diretamente.

### Opção 2 — GitHub Pages

O projeto também pode ser publicado como página estática no GitHub Pages, pois não depende de servidor dinâmico.

## 🛠️ Tecnologias Utilizadas

- **HTML5**
- **CSS3**
- **JavaScript Vanilla**
- **Canvas API**

## 📦 Estrutura Esperada

```text
.
├── index.html
├── README.md
└── LICENSE
```

O objetivo é manter o projeto simples, portátil e fácil de executar. Qualquer recurso adicional deve preservar a capacidade de rodar offline a partir do `index.html`.

## 🧩 Diretriz de Evolução

Melhorias futuras devem respeitar três regras:

1. **Não introduzir backend obrigatório.**
2. **Não exigir API externa para o jogo funcionar.**
3. **Não quebrar a execução offline.**

Recursos opcionais podem ser adicionados, desde que o núcleo do projeto continue funcionando localmente.

## 🤝 Como Contribuir

Contribuições são bem-vindas, especialmente para:

- novos minigames;
- melhorias de interface;
- refinamento de controles mobile;
- otimização de performance;
- correções de bugs;
- melhorias de acessibilidade.

Fluxo sugerido:

1. Faça um **fork** do projeto.
2. Crie uma branch para sua modificação:

```bash
git checkout -b feature/nova-funcionalidade
```

3. Faça o commit das alterações:

```bash
git commit -m "Adiciona nova funcionalidade"
```

4. Faça o push:

```bash
git push origin feature/nova-funcionalidade
```

5. Abra um **Pull Request**.

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Projeto focado em simplicidade, portabilidade e execução offline.