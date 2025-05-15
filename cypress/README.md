🛒 EBAC Shop E2E Test Suite
Este repositório contém os testes End-to-End automatizados da loja online EBAC Shop, utilizando o framework Cypress.

Os testes cobrem os principais fluxos de navegação e interação de um usuário comum, como:

Criação de conta

Login

Navegação pelo menu

Processo de compra

Pesquisa de produtos

📊 Desempenho dos Testes
Total de Testes: 19 cenários implementados

Tempo Médio de Execução: 1 minuto e 33 segundos

Eficiência: Validação muito mais rápida que o processo manual

Automatizar esses testes proporciona ganhos significativos em:

✅ Testes de regressão: Validam se novas mudanças quebraram funcionalidades existentes

⚙️ Integração contínua (CI/CD): Execução automática em pipelines

⚡ Feedback rápido: Ajuda a detectar falhas logo após alterações no código

📁 Estrutura do Projeto
perl
Copiar
Editar
WORKSPACE_ESSENTIALS/
├── .github/                # Workflows de CI/CD
├── cypress/
│   ├── downloads/          # Arquivos baixados durante os testes (ex: PDFs)
│   ├── e2e/                # Testes end-to-end (inclui meta.cy.js)
│   ├── fixtures/           # Dados simulados (mock/fake data)
│   ├── support/
│   │   └── e2e.js          # Configurações globais dos testes
├── node_modules/
├── cypress.config.js       # Arquivo de configuração principal do Cypress
├── package.json            # Dependências e scripts do projeto
├── package-lock.json
└── README.md
⚙️ Pré-requisitos
Certifique-se de ter instalado:

Node.js (versão 16 ou superior)

npm (versão 8 ou superior)

📦 Instalação
Clone este repositório:

bash
Copiar
Editar
git clone https://github.com/seu-usuario/ebac-shop-cypress.git
cd ebac-shop-cypress
Instale as dependências:

bash
Copiar
Editar
npm install
🚀 Como Executar os Testes
🖥️ Via Interface Gráfica (modo interativo)
Para abrir a interface visual do Cypress:

bash
Copiar
Editar
npm run cypress:open
Passos:

Clique em "E2E Testing"

Escolha o navegador desejado (Chrome, Firefox, Edge...)

Clique em "Start E2E Testing"

Na nova janela, clique no arquivo meta.cy.js para executar os testes

✅ Ideal para:

Desenvolvimento de novos testes

Depuração (debug)

Visualização detalhada da execução

🔧 Via Linha de Comando (modo headless)
Para executar todos os testes automaticamente sem abrir o navegador:

bash
Copiar
Editar
npm run cypress:run
✅ Ideal para:

Pipelines de CI/CD

Execuções rápidas e automáticas

Executar apenas um arquivo de teste específico:
bash
Copiar
Editar
npm run cypress:run -- --spec "cypress/e2e/meta.cy.js"
Outras opções úteis:
bash
Copiar
Editar
# Executar em navegador específico
npm run cypress:run -- --browser chrome

# Executar e gerar vídeos
npm run cypress:run -- --config video=true

# Executar em modo com navegador visível (headed)
npm run cypress:run -- --headed
🧪 Cenários Testados (meta.cy.js)
O arquivo meta.cy.js contém os seguintes testes automatizados:

1. Criação de Conta
Criação de conta com dados válidos

Criação com e-mail já registrado

2. Login
Login com credenciais válidas

Login com e-mail não cadastrado

3. Menu de Navegação
Página inicial

Menu "Home"

Menu "Comprar"

Menu "Blog"

Menu "Categorias"

Menu "Mais Vendidos"

Menu tipo "Sanduíche"

4. Fluxo de Compra
Pagamento na entrega

Transferência bancária

Pagamento com cheque

CEP inválido ou ausente

Cidade inválida ou ausente

5. Pesquisa de Produtos
Pesquisa por “Augusta Pullover Jacket”

Pesquisa por “Helena Hooded Fleece”

Produto inexistente

🧰 Configurações do Projeto
🔧 cypress.config.js
js
Copiar
Editar
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://lojaebac.ebaconline.art.br',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
  },
});
Principais configurações:

baseUrl: URL da loja EBAC

viewportWidth / viewportHeight: Tamanho da janela do navegador

defaultCommandTimeout: Tempo de espera padrão (10 segundos)

video: Desativado para não gerar vídeos (economia de espaço)

screenshotOnRunFailure: Tira prints se o teste falhar

🛠️ Arquivo support/e2e.js
js
Copiar
Editar
// Arquivo para configurações globais do Cypress
// Adicione comandos customizados ou configurações aqui
🧩 Solução de Problemas Comuns
📐 Problemas com resolução da tela
Ajuste viewportWidth e viewportHeight em cypress.config.js

Use cy.viewport(1280, 720) em testes específicos

⏱️ Timeout em comandos
Aumente defaultCommandTimeout

Adicione cy.wait() em pontos críticos

Use { timeout: 15000 } em comandos específicos

❌ Elementos não encontrados
Verifique se os seletores estão corretos e visíveis

Use cy.contains() quando apropriado

Adicione cy.scrollTo() se o elemento estiver fora da tela

🤖 Integração com CI/CD (GitHub Actions)
Exemplo de configuração para rodar os testes automaticamente:

yaml
Copiar
Editar
name: E2E Tests

on: [push, pull_request]

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v3

      - name: Cypress run
        uses: cypress-io/github-action@v5
        with:
          build: npm run build
          start: npm start
📬 Suporte
Se você tiver dúvidas ou encontrar algum erro:

Abra uma issue neste repositório

Entre em contato diretamente comigo



************************************************************************************************************


# Testes Automatizados com Cypress - API Serverest

Este projeto contém testes automatizados utilizando o framework **Cypress** para validar a API Serverest.

## ✅ Pré-requisitos

Antes de começar, certifique-se de ter os seguintes itens instalados na sua máquina:

- [Node.js](https://nodejs.org/) (recomendado: versão LTS)
- [Git](https://git-scm.com/) (opcional, caso vá clonar o projeto do GitHub)

## 📦 Instalação do Projeto

1. **Clone este repositório (se necessário)**:
   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   cd seu-repositorio
Instale as dependências do projeto:

bash
Copiar
Editar
npm install
Isso irá instalar o Cypress e outras dependências listadas no package.json.

🚀 Como executar o teste api_serverest
Você pode rodar os testes de duas formas:

🔧 1. Usando a Linha de Comando (modo headless)
Execute o seguinte comando:

bash
Copiar
Editar
npx cypress run --spec "cypress/e2e/api_serverest.cy.js"
💡 Esse comando executa o Cypress em modo headless (sem abrir a interface), ideal para integrações e execução rápida.

🖥️ 2. Usando a Interface Gráfica do Cypress (modo interativo)
Se quiser ver os testes rodando na tela, faça o seguinte:

bash
Copiar
Editar
npx cypress open
Depois que a janela do Cypress abrir:

Navegue até a pasta e2e (caso necessário).

Clique no arquivo api_serverest.cy.js para rodar o teste.

🧪 Estrutura do Projeto
lua
Copiar
Editar
seu-projeto/
├── cypress/
│   └── e2e/
│       └── api_serverest.cy.js  ← Arquivo de testes
├── cypress.config.js            ← Configuração do Cypress
├── package.json                 ← Informações e dependências do projeto
❓ Dúvidas Comuns
"O que é Cypress?"
Cypress é uma ferramenta de testes automatizados focada principalmente em testes de front-end e APIs. Ele permite simular interações com sistemas web ou chamadas HTTP.

"Posso rodar os testes em qualquer sistema operacional?"
Sim! Cypress é compatível com Windows, macOS e Linux.

"Como sei se o teste passou?"
No terminal ou na interface, você verá mensagens como ✓ indicando sucesso, ou mensagens de erro se algo falhar.

📬 Suporte
Caso tenha qualquer dúvida, entre em contato com o responsável pelo projeto ou consulte a documentação oficial do Cypress.

GIT https://github.com/ivanguanabara/desafio-cypress-QA