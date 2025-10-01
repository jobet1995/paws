import HeroSection from '../../src/components/HeroSection';

describe('<HeroSection />', () => {
  it('renders the hero section with all elements', () => {
    cy.mount(<HeroSection />);
    cy.contains('h1', 'Help Us Save Animals').should('be.visible');
    cy.contains('p', 'Every pet deserves a loving home.').should('be.visible');
    cy.contains('a', 'Adopt Now').should('be.visible').and('have.attr', 'href', '/adopt');
    cy.contains('a', 'Donate').should('be.visible').and('have.attr', 'href', '/donate');
  });
});
