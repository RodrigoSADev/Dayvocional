describe('Book Detail Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/biblia/gn');
  });

  it('should display book details', () => {
    cy.get('[data-test="book-detail-name"]').should('be.visible');
    cy.get('[data-test="book-detail-author"]').should('be.visible');
    cy.get('[data-test="book-detail-group"]').should('be.visible');
    cy.get('[data-test="book-detail-testament"]').should('be.visible');
    cy.get('[data-test="book-detail-back-button"]').should('be.visible');
    cy.get('[data-test="book-detail-chapter-button"]').should('be.visible');
  });

  it('should display chapters', () => {
    cy.get('[data-test="book-detail-chapter-button"]').each((button) => {
      cy.wrap(button).should('be.visible');
    });
    cy.get('[data-test="book-detail-chapter-button"]').should(
      'have.length',
      50
    );
  });

  it('should display loader when there are no chapters', () => {
    cy.get('[data-test="book-detail-loader"]').should('be.visible');
  });

  it('should navigate back to the bible list', () => {
    cy.get('[data-test="book-detail-back-button"]').click();
    cy.url().should('include', '/biblia');
  });
});
