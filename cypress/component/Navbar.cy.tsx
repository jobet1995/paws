import Navbar from '../../src/components/Navbar';

describe('<Navbar />', () => {
  it('renders', () => {
    cy.mount(<Navbar />);
    cy.contains('span', 'Paws & Hearts Shelter').should('be.visible');
    cy.contains('a', 'Animals').should('be.visible');
    cy.contains('a', 'Donate Now').should('be.visible');
  });

  it('toggles the mobile menu', () => {
    cy.viewport('iphone-6');
    cy.mount(<Navbar />);
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.contains('a.block', 'Animals').should('be.visible');
    cy.get('button[aria-label="Toggle menu"]').click();
    cy.contains('a.block', 'Animals').should('not.exist');
  });
});
