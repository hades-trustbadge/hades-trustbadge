# Audio assets

Esta pasta deve armazenar os arquivos de áudio locais do projeto.

Objetivo: manter o Game Boy Pro Edition executável offline, sem depender de links externos.

## Estrutura recomendada

```text
assets/audio/
├── menu.mp3
└── game.mp3
```

## Regras

- Usar caminhos relativos no HTML/JavaScript.
- Evitar dependência de CDN, servidor externo ou API.
- Preferir `.mp3` por compatibilidade ampla em navegadores.
- Manter arquivos compactos para preservar carregamento rápido.
