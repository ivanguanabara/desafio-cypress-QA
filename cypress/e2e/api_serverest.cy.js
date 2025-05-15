describe('API ServeRest - Login', () => {
    it('Validar retorno 200', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                "email": "fulano@qa.com",
                "password": "teste"
            }
        }).then((response) => {
            expect(response.status).to.equal(200)
            expect(response.body.message).to.equal('Login realizado com sucesso')
            expect(response.body).to.have.property('authorization')
        })
    })

    it('Validar retorno 401 ', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/login',
            body: {
                "email": "fulano@qa.com",
                "password": "testev"
            },
            failOnStatusCode: false  // Adicionar esta opção
        }).then((response) => {
            expect(response.status).to.equal(401)
            expect(response.body.message).to.equal('Email e/ou senha inválidos')
        })
    })
})

describe('API ServeRest - Usuários', () => {
    const randomEmail = `user_${Math.floor(Math.random() * 10000)}@teste.com`;
    it('Validar retorno 201', () => {
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                "nome": "Fulano da Silva",
                "email": randomEmail,
                "password": "teste",
                "administrador": "true"
            }
        }).then((response) => {
            expect(response.status).to.equal(201)
            expect(response.body.message).to.equal('Cadastro realizado com sucesso')
            expect(response.body).to.have.property('_id')
        })
    })

    it('Validar retorno 400', () => {
        // Primeiro, vamos cadastrar um usuário
        cy.request({
            method: 'POST',
            url: 'https://serverest.dev/usuarios',
            body: {
                "nome": "Usuário Duplicado",
                "email": "duplicado@qa.com",
                "password": "teste",
                "administrador": "false"
            },
            failOnStatusCode: false
        }).then(() => {
            // Agora tentamos cadastrar com o mesmo email
            cy.request({
                method: 'POST',
                url: 'https://serverest.dev/usuarios',
                body: {
                    "nome": "Usuário Duplicado 2",
                    "email": "duplicado@qa.com",
                    "password": "teste123",
                    "administrador": "false"
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.equal(400)
                expect(response.body.message).to.equal('Este email já está sendo usado')
            })
        })
    })
})

describe('API ServeRest - Cadastro de Produtos', () => {
    const produtoValido = {
        nome: `Produto Teste ${Date.now()}`,
        preco: 199,
        descricao: "Produto de teste automatizado",
        quantidade: 50
    };

    const produtoExistente = {
        nome: "Logitech MX Vertical",
        preco: 479,
        descricao: "Mouse",
        quantidade: 381
    };

    it('Validar retorno 200', () => {
        cy.request({
            method: 'POST',
            url: '/produtos',
            body: produtoValido,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('Validar retorno 404', () => {
        cy.request({
            method: 'POST',
            url: '/post_produtos',
            body: produtoExistente,
            failOnStatusCode: false
        }).then((response) => {
            expect(response.status).to.eq(404);
        });
    });
});

describe('Testes de API ServeRest - Carrinhos', () => {
  let token;

  before(() => {
    // Fazer login antes de todos os testes para obter o token
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/login',
      body: {
        "email": "fulano@qa.com",
        "password": "teste"
      }
    }).then((response) => {
      expect(response.status).to.equal(200);
      token = response.body.authorization;
      
      // Limpar qualquer carrinho existente
      cy.request({
        method: 'DELETE',
        url: 'https://serverest.dev/carrinhos/concluir-compra',
        headers: { Authorization: token },
        failOnStatusCode: false
      });
    });
  });

  it('Validar retorno 201', () => {
    // Primeiro vamos obter um produto válido da API
    cy.request({
      method: 'GET',
      url: 'https://serverest.dev/produtos'
    }).then(response => {
      // Pegar o ID do primeiro produto disponível
      const produtoId = response.body.produtos[0]._id;
      
      // Agora cadastrar o carrinho com um produto válido
      cy.request({
        method: 'POST',
        url: 'https://serverest.dev/carrinhos',
        headers: { Authorization: token },
        body: {
          produtos: [
            {
              idProduto: produtoId,
              quantidade: 1
            }
          ]
        }
      }).then(response => {
        expect(response.status).to.eq(201);
        expect(response.body.message).to.equal('Cadastro realizado com sucesso');
      });
    });
  });

  it('Validar retorno 400', () => {
    // Tentar criar um segundo carrinho, que deve falhar
    cy.request({
      method: 'POST',
      url: 'https://serverest.dev/carrinhos',
      headers: { Authorization: token },
      body: {
        produtos: [
          {
            idProduto: "BeeJh51z3KdsS1zA", // Será substituído se falhar
            quantidade: 1
          }
        ]
      },
      failOnStatusCode: false
    }).then(response => {
      expect(response.status).to.eq(400);
      expect(response.body.message).to.equal('Não é permitido ter mais de 1 carrinho');
    });
  });
});

