describe('Header Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/inicio');
  });

  it('should display the header link', () => {
    cy.get('[data-test="header-link"]').should('be.visible');
  });

  it('should display the header image', () => {
    cy.get('[data-test="header-image"]').should('be.visible');
  });

  it('should display the search component', () => {
    cy.get('app-search').should('be.visible');
  });
});
