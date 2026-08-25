# Consulta de Férias — Projeto DIO

Protótipo front-end de uma consulta individual de períodos de férias, desenvolvido como projeto educacional para a DIO.

## Funcionalidades

- consulta por usuário e matrícula;
- exibição dos períodos de 2025 e 2026;
- cálculo da quantidade de dias;
- interface responsiva e acessível;
- mensagens de validação;
- testes automatizados com o test runner nativo do Node.js.

## Como executar

Sirva a pasta `docs` por HTTP. Uma opção simples é usar a extensão **Live Server** no VS Code e abrir `docs/ferias.html`.

> Abrir o HTML diretamente pelo sistema de arquivos pode impedir o navegador de carregar o JSON por segurança.

### Dados de demonstração

| Usuário | Matrícula |
|---|---:|
| Joao | 123 |
| Maria | 456 |
| Pedro | 789 |

Os dados são inteiramente fictícios. Este projeto não implementa autenticação real e não deve armazenar dados pessoais ou corporativos.

## Testes

Requer Node.js 18 ou superior:

```bash
npm test
```

Não há dependências externas para instalar.

## Estrutura principal

```text
docs/
├── ferias.html
└── assets/
    ├── css/ferias.css
    ├── data/ferias.json
    └── js/ferias.js
test/
└── ferias.test.js
```

## Tecnologias

HTML5, CSS3, JavaScript, JSON e Node.js Test Runner.
