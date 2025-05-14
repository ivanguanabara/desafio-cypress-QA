/// <reference types="cypress" />

describe('Ebac Shop - Criação de Conta', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('Validar fluxo de criação de conta ', () => {
    cy.get('div.dropdown.menu').eq(1).click()
    cy.get('#reg_email').type(`ivan_silva_${Math.random().toString(36).substring(2, 5)}${Date.now()}@teste.com.br`);
    cy.get('#reg_password').type('@Meta123#$')
    cy.get('input[name="register"]').click();
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/minha-conta/')
  });

  it('Validar fluxo de criação de conta com email já criado ', () => {
    cy.get('div.dropdown.menu').eq(1).click()
    cy.get('#reg_email').type(`ivan@teste.com.br`);
    cy.get('#reg_password').type('@Meta123#$')
    cy.get('input[name="register"]').click();
    cy.contains('Erro: Uma conta já está registrada com seu endereço de e-mail. Faça login.').should('be.visible')
  });
})

describe('Ebac Shop - Login', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('Validar fluxo de Login com sucesso', () => {
    cy.get('div.dropdown.menu').eq(1).click()
    cy.get('#username').type('ivan@teste.com.br')
    cy.get('#password').type('@Meta123#$')
    cy.get('input[name="login"]').click();
    cy.contains('ivan').should('be.visible')
  });

  it('Validar fluxo de Login sem email cadastrado', () => {
    cy.get('div.dropdown.menu').eq(1).click()
    cy.get('#username').type('ivan barrs@teste.com.br')
    cy.get('#password').type('@Meta123#$')
    cy.get('input[name="login"]').click();
    cy.contains('Erro: O usuário ivan barrs@teste.com.br não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail.').should('be.visible')
  });
})

describe('Ebac Shop - Menu', () => {

  beforeEach(() => {
    cy.visit('/')
  });
  it('Validar pagina incial', () => {
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/')
  })

  it('Validar menu HOME', () => {
    cy.get('.dropdown-toggle')
    cy.contains('Home ')
      .should('have.text', 'Home ')
  });

  it('Validar menu COMPRAR', () => {
    cy.contains('Comprar')
      .should('have.text', 'Comprar')
      .click({force:true})
      cy.url().should('include', 'http://lojaebac.ebaconline.art.br/produtos/')
  });

  it('Validar menu BLOG', () => {
    cy.contains('Blog ')
      .should('have.text', 'Blog ')
      .click({force:true})
      cy.url().should('include', 'http://lojaebac.ebaconline.art.br/#')
  });

  it('Validar menu CATEGORIAS', () => {
    cy.contains('Categorias')
      .should('have.text', 'Categorias')
      .click({force:true})
      cy.url().should('include', 'http://lojaebac.ebaconline.art.br/#')
  });

  it('Validar menu MAIS VENDIDOS', () => {
    cy.contains('Mais vendidos')
      .should('have.text', 'Mais vendidos')
      .click({force:true})
      cy.url().should('include', 'http://lojaebac.ebaconline.art.br/#')
  });

  it('Validar menu "Sanduiche" ', () => {
    cy.get('.dropdown-toggle > .zmdi').click()
      .should('be.visible', 'Minha conta')
      .should('be.visible', 'Checkout')
      .should('be.visible', 'Lista de desejos')
  });
  
})

describe('Ebac Shop - Comprar - Fluxo de Compra', () => {

  beforeEach(() => {
    cy.visit('/')
  });
  it('Validar Fluxo de Compra com pagamento na entrega', () => {
    cy.contains('Comprar').click({ force: true })
    cy.contains('Abominable Hoodie').click()
    cy.wait(1000)
    cy.get('[data-value="S"]').click({ force: true })
    cy.get('[data-value="Green"]').click({ force: true })
    cy.get('button').contains('Comprar').click()
    cy.get('a').contains('Ver carrinho').click()
    cy.contains('a', 'Concluir compra').click()
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/checkout/')
    cy.get('#billing_first_name').type('Ivan ')
    cy.get('#billing_last_name').type('Barros')
    cy.get('#billing_company').type('Meta')
    cy.get('#billing_address_1').type('Rua São Bento - 1920')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('09434500')
    cy.get('#billing_phone').type('11 97666 5000')
    cy.get('#billing_email').type('ivan@meta.com.br')
    cy.contains('Pagamento na entrega').click();
    cy.get('#terms').click()
    cy.get('[data-value="Finalizar compra"]').click({ force: true })
    cy.contains('Obrigado. Seu pedido foi recebido.').should('be.visible')
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/checkout/order-received')
  })

  it('Validar Fluxo de Compra com pagamento de Transferencia Bancária', () => {
    cy.contains('Comprar').click({ force: true })
    cy.contains('Abominable Hoodie').click()
    cy.wait(1000)
    cy.get('[data-value="S"]').click({ force: true })
    cy.get('[data-value="Green"]').click({ force: true })
    cy.get('button').contains('Comprar').click()
    cy.get('a').contains('Ver carrinho').click()
    cy.contains('a', 'Concluir compra').click()
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/checkout/')
    cy.get('#billing_first_name').type('Ivan ')
    cy.get('#billing_last_name').type('Barros')
    cy.get('#billing_company').type('Meta')
    cy.get('#billing_address_1').type('Rua São Bento - 1920')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('09434500')
    cy.get('#billing_phone').type('11 97666 5000')
    cy.get('#billing_email').type('ivan@meta.com.br')
    cy.contains('Transferência bancária').click();
    cy.get('#terms').click()
    cy.get('[data-value="Finalizar compra"]').click({ force: true })
    cy.contains('Obrigado. Seu pedido foi recebido.').should('be.visible')
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/checkout/order-received')
  })

  it('Validar Fluxo de Compra com de Cheque', () => {
    cy.contains('Comprar').click({ force: true })
    cy.contains('Abominable Hoodie').click()
    cy.wait(1000)
    cy.get('[data-value="S"]').click({ force: true })
    cy.get('[data-value="Green"]').click({ force: true })
    cy.get('button').contains('Comprar').click()
    cy.get('a').contains('Ver carrinho').click()
    cy.contains('a', 'Concluir compra').click()
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/checkout/')
    cy.get('#billing_first_name').type('Ivan ')
    cy.get('#billing_last_name').type('Barros')
    cy.get('#billing_company').type('Meta')
    cy.get('#billing_address_1').type('Rua São Bento - 1920')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('09434500')
    cy.get('#billing_phone').type('11 97666 5000')
    cy.get('#billing_email').type('ivan@meta.com.br')
    cy.contains('Cheque').click();
    cy.get('#terms').click()
    cy.get('[data-value="Finalizar compra"]').click({ force: true })
    cy.contains('Obrigado. Seu pedido foi recebido.').should('be.visible')
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/checkout/order-received')
  })

  it('Validar Fluxo de Compra com falta de preenchimento correto no campo CEP', () => {
    cy.contains('Comprar').click({ force: true })
    cy.contains('Abominable Hoodie').click()
    cy.wait(1000)
    cy.get('[data-value="S"]').click({ force: true })
    cy.get('[data-value="Green"]').click({ force: true })
    cy.get('button').contains('Comprar').click()
    cy.get('a').contains('Ver carrinho').click()
    cy.contains('a', 'Concluir compra').click()
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/checkout/')
    cy.get('#billing_first_name').type('Ivan ')
    cy.get('#billing_last_name').type('Barros')
    cy.get('#billing_company').type('Meta')
    cy.get('#billing_address_1').type('Rua São Bento - 1920')
    cy.get('#billing_city').type('São Paulo')
    cy.get('#billing_postcode').type('aaaa')
    cy.get('#billing_phone').type('11 97666 5000')
    cy.get('#billing_email').type('ivan@meta.com.br')
    cy.contains('Pagamento na entrega').click();
    cy.get('#terms').click()
    cy.get('[data-value="Finalizar compra"]').click({ force: true })
    cy.contains('O campo "CEP" do endereço de faturamento não é um CEP válido.').should('be.visible')
  })

  it('Validar Fluxo de Compra com falta de preenchimento correto no campo Cidade', () => {
    cy.contains('Comprar').click({ force: true })
    cy.contains('Abominable Hoodie').click()
    cy.wait(1000)
    cy.get('[data-value="S"]').click({ force: true })
    cy.get('[data-value="Green"]').click({ force: true })
    cy.get('button').contains('Comprar').click()
    cy.get('a').contains('Ver carrinho').click()
    cy.contains('a', 'Concluir compra').click()
    cy.url().should('eq', 'http://lojaebac.ebaconline.art.br/checkout/')
    cy.get('#billing_first_name').type('Ivan ')
    cy.get('#billing_last_name').type('Barros')
    cy.get('#billing_company').type('Meta')
    cy.get('#billing_address_1').type('Rua São Bento - 1920')
    cy.get('#billing_postcode').type('09434500')
    cy.get('#billing_phone').type('11 97666 5000')
    cy.get('#billing_email').type('ivan@meta.com.br')
    cy.contains('Pagamento na entrega').click();
    cy.get('#terms').click()
    cy.get('[data-value="Finalizar compra"]').click({ force: true })
    cy.contains('O campo "Cidade" do endereço de faturamento é um campo obrigatório.').should('be.visible')
  })

});

describe('Ebac Shop - Pesquisa', () => {

  beforeEach(() => {
    cy.visit('/')
  });

  it('Validar fluxo de pesquisa - Augusta Pullover Jacket', () => {
    cy.get('.search-form-modal').eq(1).click()
    cy.get('.form-control').eq(2).type('Augusta Pullover Jacket')
    cy.wait(2000)
    cy.contains('Augusta Pullover Jacket').click()
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/product/augusta-pullover-jacket/')
  });  

  it('Validar fluxo de pesquisa - Helena Hooded Fleece', () => {
    cy.get('.search-form-modal').eq(1).click()
    cy.get('.form-control').eq(2).type('Helena Hooded Fleece')
    cy.wait(1000)
    cy.contains('Helena Hooded Fleece').click()
    cy.url().should('include', 'http://lojaebac.ebaconline.art.br/product/helena-hooded-fleece/')
  });

  it('Validar fluxo de pesquisa com produto não encontrado', () => {
    cy.get('.search-form-modal').eq(1).click()
    cy.get('.form-control').eq(2).type('Ivan Barros')
    cy.contains('No results found')
  });
})


