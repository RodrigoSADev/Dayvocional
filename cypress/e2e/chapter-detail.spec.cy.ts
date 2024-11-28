describe('Chapter Detail Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/biblia/gn/capitulo/1');
  });

  it('should display chapter details', () => {
    cy.get('[data-test="chapter-detail-book"]').should('be.visible');
  });

  it('should display verses', () => {
    cy.get('[data-test="chapter-detail-verse"]').should(
      'have.length.greaterThan',
      0
    );
  });

  it('should display loader when explanation is loading', () => {
    cy.get('[data-test="chapter-detail-generate-explanation-button"]').click();
    cy.get('[data-test="chapter-detail-explanation-loader"]').should(
      'be.visible'
    );
  });

  it('should display loader when chapter is loading', () => {
    cy.get('[data-test="chapter-detail-loader"]').should('be.visible');
  });

  it('should navigate back to the book detail', () => {
    cy.get('[data-test="chapter-detail-back-button"]').click();
    cy.url().should('include', '/biblia');
  });

  it('should navigate to the previous chapter', () => {
    cy.visit('http://localhost:4200/biblia/gn/capitulo/2');
    cy.get('[data-test="chapter-detail-previous-button"]').click();
    cy.url().should('include', '/capitulo/');
  });

  it('should navigate to the next chapter', () => {
    cy.get('[data-test="chapter-detail-next-button"]').click();
    cy.url().should('include', '/capitulo/');
  });

  it('should generate explanation', () => {
    cy.get('[data-test="chapter-detail-generate-explanation-button"]').click();
    setTimeout(() => {
      cy.get('[data-test="chapter-detail-explanation"]').should('be.visible');
    }, 3000);
  });
});
