// describe('Home Component', () => {
//   beforeEach(() => {
//     cy.visit('http://localhost:4200/inicio');
//   });

//   it('should display the verse of the day', () => {
//     cy.get('[data-test="home-title"]')
//       .contains('Versículo do Dia')
//       .should('be.visible');
//     cy.get('[data-test="home-booke-name"]').should('be.visible');
//     cy.get('[data-test="home-verse"]').first().should('be.visible');
//   });

//   it('should display loader when explanation is loading', () => {
//     cy.get('[data-test="home-explanation-loader"]').should('be.visible');
//   });

//   it('should display explanation when loaded', () => {
//     cy.get('.alert.alert-info').should('be.visible');
//   });

//   it('should display loader when verse is loading', () => {
//     cy.get('[data-test="home-loader"]').should('be.visible');
//   });

//   it('should display generate explanation button', () => {
//     cy.get('button.btn.btn-primary')
//       .contains('Gerar Explicação')
//       .should('be.visible');
//   });
// });
describe('Home Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/inicio');
  });

  it('should display the verse of the day', () => {
    cy.get('[data-test="home-title"]')
      .contains('Versículo do Dia')
      .should('be.visible');
    cy.get('[data-test="home-booke-name"]').should('be.visible');
    cy.get('[data-test="home-verse"]').first().should('be.visible');
  });

  it('should display loader when explanation is loading', () => {
    cy.get('[data-test="home-loader"]').should('be.visible');
  });

  it('should display loader when verse is loading', () => {
    cy.get('[data-test="home-generate-explanation-button"]').click();
    cy.get('[data-test="home-explanation-loader"]').should('be.visible');
  });

  it('should display generate explanation button', () => {
    cy.get('button.btn.btn-primary')
      .contains('Gerar Explicação')
      .should('be.visible');
  });

  it('should click the generate explanation button', () => {
    cy.get('[data-test="home-generate-explanation-button"]').click();
    setTimeout(() => {
      cy.get('[data-test="home-explanation-loader"]').should('be.visible');
    }, 3000);
  });
});
