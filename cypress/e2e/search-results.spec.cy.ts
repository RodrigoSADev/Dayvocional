describe('Search Results Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/busca?palavra=milagre');
  });

  it('should display loader when search results are loading', () => {
    cy.get('[data-test="search-results-loader"]').should('be.visible');
  });

  it('should display search results when available', () => {
    cy.get('[data-test="search-results-books"]', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    );
    cy.get('[data-test="search-results-books"]').should('be.visible');
    cy.get('[data-test="search-results-verses"]', { timeout: 10000 }).should(
      'have.length.greaterThan',
      0
    );
  });

  it('should display error message when no results are found', () => {
    cy.visit(
      'http://localhost:4200/busca?palavra=xfhnjfcmnjfmgvhbmvmgjgjhvbm,'
    );
    cy.get('[data-test="search-results-error"]', { timeout: 10000 }).should(
      'be.visible'
    );
  });
});
