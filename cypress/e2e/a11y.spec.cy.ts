describe('A11yComponent', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/inicio');
  });

  it('should increase font size when increase button is clicked', () => {
    cy.get('body').then(($body) => {
      const initialFontSize = $body.css('font-size');
      cy.get(
        'button[aria-label="Clique para aumentar o tamanho da fonte"]'
      ).click();
      cy.get('body').should(($bodyAfterClick) => {
        const newFontSize = $bodyAfterClick.css('font-size');
        expect(parseFloat(newFontSize)).to.be.greaterThan(
          parseFloat(initialFontSize)
        );
      });
    });
  });

  it('should decrease font size when decrease button is clicked', () => {
    cy.get('body').then(($body) => {
      const initialFontSize = $body.css('font-size');
      cy.get(
        'button[aria-label="Clique para diminuir o tamanho da fonte"]'
      ).click();
      cy.get('body').should(($bodyAfterClick) => {
        const newFontSize = $bodyAfterClick.css('font-size');
        expect(parseFloat(newFontSize)).to.be.lessThan(
          parseFloat(initialFontSize)
        );
      });
    });
  });

  it('should have accessible buttons with correct aria labels', () => {
    cy.get(
      'button[aria-label="Clique para aumentar o tamanho da fonte"]'
    ).should('exist');
    cy.get(
      'button[aria-label="Clique para diminuir o tamanho da fonte"]'
    ).should('exist');
  });

  it('should have images with correct alt text', () => {
    cy.get(
      'button[aria-label="Clique para aumentar o tamanho da fonte"] img'
    ).should(
      'have.attr',
      'alt',
      'aumentar o tamanho da fonte para melhor legibilidade'
    );
    cy.get(
      'button[aria-label="Clique para diminuir o tamanho da fonte"] img'
    ).should(
      'have.attr',
      'alt',
      'diminuir o tamanho da fonte para melhor legibilidade'
    );
  });
});
