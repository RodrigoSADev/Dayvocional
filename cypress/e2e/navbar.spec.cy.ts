describe('Navbar Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/inicio');
  });

  it('should display the home button', () => {
    cy.get('[data-test="navbar-home-button"]').should('be.visible');
  });

  it('should display the bible button', () => {
    cy.get('[data-test="navbar-bible-button"]').should('be.visible');
  });

  it('should navigate to the home page on home button click', () => {
    cy.visit('http://localhost:4200/biblia');
    cy.get('[data-test="navbar-home-button"]').click();
    cy.url().should('include', '/inicio');
  });

  it('should navigate to the bible page on bible button click', () => {
    cy.get('[data-test="navbar-bible-button"]').click();
    cy.url().should('include', '/biblia');
  });
});
