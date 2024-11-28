describe('Search Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/inicio');
  });

  it('should display the search input', () => {
    cy.get('[data-test="search-input"]').should('be.visible');
  });

  it('should display the search button', () => {
    cy.get('[data-test="search-button"]').should('be.visible');
  });

  it('should display error message for required field', () => {
    cy.get('[data-test="search-input"]').focus().blur();
    cy.get('.text-danger')
      .contains('Por favor, digite uma palavra.')
      .should('be.visible');
  });

  it('should display error message for minlength', () => {
    cy.get('[data-test="search-input"]').type('a').blur();
    cy.get('.text-danger')
      .contains('Digite uma palavra com no mínimo duas palavras.')
      .should('be.visible');
  });

  it('should enable search button when input is valid', () => {
    cy.get('[data-test="search-input"]').type('palavra');
    cy.get('[data-test="search-button"]').should('not.be.disabled');
  });

  it('should perform search on button click', () => {
    cy.get('[data-test="search-input"]').type('milagre');
    cy.get('[data-test="search-button"]').click();
    cy.get('[data-test="search-results-books"]', { timeout: 10000 }).should(
      'be.visible'
    );
    cy.get('[data-test="search-results-verses"]', { timeout: 10000 }).should(
      'be.visible'
    );
  });
});
