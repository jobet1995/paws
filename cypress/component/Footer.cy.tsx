import Footer from '../../src/components/Footer';

describe('<Footer />', () => {
  it('renders all sections of the footer', () => {
    cy.mount(<Footer />);
    cy.contains('h3', 'Quick Links').should('be.visible');
    cy.contains('h3', 'Get Involved').should('be.visible');
    cy.contains('h3', 'Newsletter').should('be.visible');
    cy.get('input[placeholder="Your email address"]').should('be.visible');
    cy.contains('p', 'Paws & Hearts Animal Shelter. All rights reserved.').should('be.visible');
  });

  it('allows users to subscribe to the newsletter', () => {
    const userEmail = 'test@example.com';
    cy.mount(<Footer />);

    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    cy.get('input[placeholder="Your email address"]').type(userEmail);
    cy.contains('button', 'Subscribe').click();
    cy.get('@alertStub').should('have.been.calledOnceWith', `Thank you for subscribing with ${userEmail}!`);
    cy.get('input[placeholder="Your email address"]').should('have.value', '');
  });

  it('contains working social media links', () => {
    cy.mount(<Footer />);
    cy.get('a[aria-label="Facebook"]').should('have.attr', 'href', '#');
    cy.get('a[aria-label="Instagram"]').should('have.attr', 'href', '#');
    cy.get('a[aria-label="Twitter"]').should('have.attr', 'href', '#');
  });
});
