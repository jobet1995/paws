import TestimonialsCarousel from '../../src/components/TestimonialsCarousel';
import { testimonials } from '../../src/lib/data';

describe('<TestimonialsCarousel />', () => {
  // Use cy.clock() to control setInterval and cy.tick() to advance time
  beforeEach(() => {
    cy.clock();
  });

  it('renders the first testimonial initially', () => {
    cy.mount(<TestimonialsCarousel />);
    cy.contains('h3', testimonials[0].name).should('be.visible');
    cy.contains('p', testimonials[0].text).should('be.visible');
  });

  it('navigates to the next testimonial on button click', () => {
    cy.mount(<TestimonialsCarousel />);
    cy.get('button[aria-label="Next testimonial"]').click();
    cy.contains('h3', testimonials[1].name).should('be.visible');
  });

  it('navigates to the previous testimonial on button click', () => {
    cy.mount(<TestimonialsCarousel />);
    // Go forward once to get to the second testimonial
    cy.get('button[aria-label="Next testimonial"]').click();
    cy.contains('h3', testimonials[1].name).should('be.visible');

    // Now go back to the first one
    cy.get('button[aria-label="Previous testimonial"]').click();
    cy.contains('h3', testimonials[0].name).should('be.visible');
  });

  it('wraps around from the first to the last testimonial when clicking previous', () => {
    cy.mount(<TestimonialsCarousel />);
    cy.get('button[aria-label="Previous testimonial"]').click();
    cy.contains('h3', testimonials[testimonials.length - 1].name).should('be.visible');
  });

  it('advances testimonials automatically after 5 seconds', () => {
    cy.mount(<TestimonialsCarousel />);
    cy.contains('h3', testimonials[0].name).should('be.visible');

    // Advance the clock by 5000ms
    cy.tick(5000);

    cy.contains('h3', testimonials[1].name).should('be.visible');
  });

  it('displays the correct dot indicator for the current slide', () => {
    cy.mount(<TestimonialsCarousel />);
    // The first dot should be active
    cy.get('button[aria-label="Go to testimonial 1"]').should('have.class', 'bg-amber-600');
    cy.get('button[aria-label="Go to testimonial 2"]').should('not.have.class', 'bg-amber-600');

    // Go to the next slide
    cy.get('button[aria-label="Next testimonial"]').click();

    // The second dot should be active
    cy.get('button[aria-label="Go to testimonial 1"]').should('not.have.class', 'bg-amber-600');
    cy.get('button[aria-label="Go to testimonial 2"]').should('have.class', 'bg-amber-600');
  });
});
