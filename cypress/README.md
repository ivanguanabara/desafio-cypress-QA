EBAC Shop E2E Test Suite
Este repositório contém meus testes end-to-end automatizados para o e-commerce EBAC Shop, utilizando Cypress. Os testes cobrem os principais fluxos de usuário, incluindo criação de conta, login, navegação pelo menu, processo de compra e pesquisa de produtos.
Desempenho dos Testes

Total de Testes: 19 testes implementados
Tempo de Execução: Aproximadamente 01:33 (um minuto e trinta e três segundos)
Eficiência: Os testes automatizados executam em tempo significativamente menor comparado à validação manual desses mesmos fluxos

A automação destes cenários traz grande eficiência no processo de validação, especialmente em:

Testes de regressão: Validação rápida após atualizações de código
Integração contínua: Execução automática em pipelines de CI/CD
Feedback rápido: Retorno quase imediato sobre a qualidade da aplicação após mudanças

Estrutura do Projeto
WORKSPACE_ESSENTIALS/
├── .github/
├── cypress/
│   ├── downloads/
│   ├── e2e/
│   │   └── meta.cy.js
│   ├── fixtures/
│   ├── support/
│   │   └── e2e.js
├── node_modules/
├── cypress.config.js
├── package-lock.json
├── package.json
└── README.md
Pré-requisitos

Node.js (v16 ou superior)
npm (v8 ou superior)

Instalação

Clone este repositório:

bashgit clone https://github.com/seu-usuario/ebac-shop-cypress.git
cd ebac-shop-cypress

Instale as dependências:

bashnpm install
Como Executar os Testes
Execução via Interface Gráfica do Cypress
Para abrir a interface gráfica do Cypress e executar os testes interativamente:
bashnpm run cypress:open
Após executar este comando:

Será aberta a interface visual do Cypress
Clique em "E2E Testing" no painel principal
Selecione seu navegador preferido (Chrome, Firefox, Edge, etc.)
Clique em "Start E2E Testing in [Navegador]"
Na nova janela do navegador, clique no arquivo "meta.cy.js" para iniciar os testes
Você verá a execução em tempo real com detalhes de cada passo

A interface gráfica é excelente para:

Desenvolvimento de novos testes
Depuração de falhas
Visualização passo a passo da execução
Inspeção de elementos na página durante o teste

Execução via Linha de Comando
Para executar todos os testes em modo headless (sem interface gráfica):
bashnpm run cypress:run
Este comando:

Executa todos os testes automaticamente sem abrir navegador visível
Mostra os resultados diretamente no terminal
Gera screenshots para falhas (se configurado)
É ideal para ambientes de CI/CD e execuções automatizadas

Para executar especificamente o arquivo meta.cy.js:
bashnpm run cypress:run -- --spec "cypress/e2e/meta.cy.js"
Opções adicionais úteis para linha de comando:
bash# Executar em um navegador específico
npm run cypress:run -- --browser chrome

# Executar e gerar vídeos
npm run cypress:run -- --config video=true

# Executar em modo não-headless (com navegador visível)
npm run cypress:run -- --headed
Sobre o Arquivo meta.cy.js
O arquivo meta.cy.js contém todos os cenários de teste automatizados para o EBAC Shop. Implementei os seguintes cenários:
1. Criação de Conta

Validação do fluxo de criação de conta
Validação do fluxo de criação de conta com email já criado

2. Login

Validação do fluxo de Login com sucesso
Validação do fluxo de Login sem email cadastrado

3. Menu

Validação da página inicial
Validação do menu HOME
Validação do menu COMPRAR
Validação do menu BLOG
Validação do menu CATEGORIAS
Validação do menu MAIS VENDIDOS
Validação do menu "Sanduíche"

4. Fluxo de Compra

Validação do Fluxo de Compra com pagamento na entrega
Validação do Fluxo de Compra com pagamento de Transferência Bancária
Validação do Fluxo de Compra com de Cheque
Validação do Fluxo de Compra com falta de preenchimento correto no campo CEP
Validação do Fluxo de Compra com falta de preenchimento correto no campo Cidade

5. Pesquisa

Validação do fluxo de pesquisa - Augusta Pullover Jacket
Validação do fluxo de pesquisa - Helena Hooded Fleece
Validação do fluxo de pesquisa com produto não encontrado

Importância dos Testes Automatizados
Estes testes automatizados trazem diversos benefícios:

Velocidade de Execução: Em apenas 01:33, validamos 19 fluxos críticos que manualmente levariam muito mais tempo
Confiabilidade na Regressão: Garante que funcionalidades existentes continuem funcionando após novas implementações
Redução de Risco: Identifica rapidamente problemas introduzidos por novas atualizações de código
Agilidade no Desenvolvimento: Permite implementações mais rápidas com feedback imediato sobre a qualidade

Especialmente em e-commerce, onde testes manuais frequentes seriam inviáveis pela quantidade de fluxos a serem validados, a automação se torna essencial para manter a qualidade do produto.
Configurações do Projeto
cypress.config.js
javascriptconst { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://lojaebac.ebaconline.art.br',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    video: false,
    screenshotOnRunFailure: true,
  },
})
Explicação das configurações principais:

baseUrl: URL base do site que estamos testando
viewportWidth/Height: Dimensões da janela do navegador (ajustar conforme seu monitor)
defaultCommandTimeout: Tempo máximo de espera para comandos (10s)
video: Desativado para economizar espaço em disco
screenshotOnRunFailure: Captura screenshots quando testes falham

support/e2e.js
Este arquivo contém configurações globais para os testes end-to-end, incluindo configurações padrão do Cypress:
javascript// Arquivo e2e.js básico com configurações padrão do Cypress
// Você pode adicionar configurações específicas aqui conforme necessário
Estrutura dos Testes no meta.cy.js
Meus testes no arquivo meta.cy.js seguem esta estrutura:
javascript/// <reference types="cypress" />

describe('Ebac Shop - Criação de Conta', () => {
  it('Validar fluxo de criação de conta', () => {
    cy.visit('/minha-conta')
    // Implementação da verificação da criação de conta
  })

  it('Validar fluxo de criação de conta com email já criado', () => {
    cy.visit('/minha-conta')
    // Implementação da verificação com email já existente
  })
})

describe('Ebac Shop - Login', () => {
  it('Validar fluxo de Login com sucesso', () => {
    cy.visit('/minha-conta')
    // Implementação do login bem-sucedido
  })

  it('Validar fluxo de Login sem email cadastrado', () => {
    cy.visit('/minha-conta')
    // Implementação do login com email não cadastrado
  })
})

// E assim por diante para os demais cenários de teste...
Solução de Problemas Comuns
Ajustes de Viewport
As configurações de viewportWidth e viewportHeight podem precisar de ajustes dependendo do seu monitor. Se você estiver enfrentando problemas com elementos que não estão visíveis durante os testes, considere:

Ajustar as dimensões no arquivo de configuração para corresponder à resolução do seu monitor
Usar valores menores para garantir compatibilidade com diferentes tamanhos de tela
Para testes específicos que requerem outras resoluções, você pode usar o comando cy.viewport(width, height) dentro do teste

Problemas de Timeout
Se os testes estiverem falhando por timeout, você pode:

Aumentar o defaultCommandTimeout no arquivo de configuração
Usar cy.wait() em pontos específicos onde o carregamento é mais lento
Utilizar o método { timeout: 15000 } em comandos específicos que precisam de mais tempo

Elementos não encontrados
Se o Cypress não conseguir encontrar elementos na página:

Verifique se os seletores estão corretos e únicos
Use o comando cy.contains() para elementos que podem mudar de posição
Adicione cy.scrollTo() antes de interagir com elementos que podem estar fora da área visível

Integração com CI/CD
Para integrar estes testes em um pipeline de CI/CD, configure seu arquivo de CI (por exemplo, GitHub Actions) assim:
yamlname: E2E Tests

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

          
Suporte
Se encontrar algum problema, por favor abra uma issue no repositório ou entre em contato diretamente comigo.