import TestimonialsCarousel from '../../src/components/TestimonialsCarousel';

describe('<TestimonialsCarousel />', () => {
  beforeEach(() => {
    // Mount the component without any props, as it uses hard-coded data.
    cy.mount(<TestimonialsCarousel />);
  });

  it('renders the initial testimonial correctly from the hard-coded data', () => {
    // The first testimonial in src/lib/data.ts is Jennifer Williams.
    cy.get('h3').should('contain', 'Jennifer Williams');
    cy.get('p.text-amber-600').should('contain', 'Adopted Luna - Siamese Cat');
    cy.get('img')
      .should('be.visible')
      .and('have.prop', 'naturalWidth')
      .and('be.gt', 0);
  });

  it('navigates to the next and previous testimonials without being covered', () => {
    // Initial: Jennifer Williams
    cy.get('h3').should('contain', 'Jennifer Williams');

    // Click Next
    cy.get('button[aria-label="Next testimonial"]').click();
    // Should be David Thompson
    cy.get('h3').should('contain', 'David Thompson');

    // Click Next again
    cy.get('button[aria-label="Next testimonial"]').click();
    // Should be Maria Garcia
    cy.get('h3').should('contain', 'Maria Garcia');

    // Click Next again to wrap around
    cy.get('button[aria-label="Next testimonial"]').click();
    // Should be back to Jennifer Williams
    cy.get('h3').should('contain', 'Jennifer Williams');

    // Click Previous to go to the last testimonial
    cy.get('button[aria-label="Previous testimonial"]').click();
    // Should be Maria Garcia
    cy.get('h3').should('contain', 'Maria Garcia');
  });
});
