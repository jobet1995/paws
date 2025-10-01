import Newsletter from '../../src/components/Newsletter';

describe('<Newsletter />', () => {
  it('renders the newsletter subscription form', () => {
    cy.mount(<Newsletter />);
    cy.contains('h2', 'Stay in the Know').should('be.visible');
    cy.contains('p', 'Subscribe to our newsletter').should('be.visible');
    cy.get('input[placeholder="Enter your email address"]').should('be.visible');
    cy.contains('button', 'Subscribe').should('be.visible');
  });

  it('allows a user to subscribe', () => {
    const userEmail = 'new.subscriber@example.com';
    cy.mount(<Newsletter />);

    const alertStub = cy.stub().as('alertStub');
    cy.on('window:alert', alertStub);

    cy.get('input[placeholder="Enter your email address"]').type(userEmail);
    cy.contains('button', 'Subscribe').click();

    cy.get('@alertStub').should('have.been.calledOnceWith', `Thank you for subscribing with ${userEmail}!`);
    cy.get('input[placeholder="Enter your email address"]').should('have.value', '');
  });
});
