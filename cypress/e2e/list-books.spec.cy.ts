describe('List Books Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/biblia');
  });

  it('should display book groups', () => {
    cy.get('[data-test="list-books-name"]').should(
      'have.length.greaterThan',
      0
    );
  });

  it('should display books in each group', () => {
    cy.get('[data-test="list-books-button"]').should(
      'have.length.greaterThan',
      0
    );
  });

  it('should display loader when books are loading', () => {
    cy.get('[data-test="list-books-loader"]').should('be.visible');
  });

  it('should navigate to the correct book detail page on button click', () => {
    cy.get('[data-test="list-books-button"]').first().click();
    cy.url().should('include', '/biblia/gn');
  });
});
