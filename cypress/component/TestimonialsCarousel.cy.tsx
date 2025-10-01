import TestimonialsCarousel, { Testimonial } from '../../src/components/TestimonialsCarousel';

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    animal: 'Buddy',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Adopting Buddy was the best decision of our lives. He brings so much joy and laughter to our home.',
  },
  {
    name: 'Jane Smith',
    animal: 'Whiskers',
    image: 'https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Whiskers is the sweetest cat I have ever met. She settled into our home right away.',
  },
  {
    name: 'Peter Jones',
    animal: 'Rocky',
    image: 'https://images.pexels.com/photos/4001296/pexels-photo-4001296.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'We never thought we would adopt a rabbit, but Rocky has completely stolen our hearts.',
  },
];

describe('<TestimonialsCarousel />', () => {
  beforeEach(() => {
    cy.mount(<TestimonialsCarousel testimonials={testimonials} />);
  });

  it('renders the initial testimonial correctly', () => {
    cy.get('h3').should('contain', 'John Doe').and('be.visible');
    cy.get('p.text-amber-600').should('contain', 'Adopted Buddy').and('be.visible');
    cy.get('img[alt="John Doe"]').should('be.visible');
    cy.get('p.text-gray-700').should('contain', 'Adopting Buddy was the best decision').and('be.visible');
  });

  it('navigates with next and previous buttons', () => {
    // Go to next
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });
    cy.get('h3').should('contain', 'Jane Smith').and('be.visible');
    cy.get('p.text-amber-600').should('contain', 'Adopted Whiskers').and('be.visible');

    // Go back to previous
    cy.get('button[aria-label="Previous testimonial"]').click({ force: true });
    cy.get('h3').should('contain', 'John Doe').and('be.visible');
    cy.get('p.text-amber-600').should('contain', 'Adopted Buddy').and('be.visible');
  });

  it('navigates with indicator dots', () => {
    cy.get('button[aria-label="Go to testimonial 3"]').click({ force: true });
    cy.get('h3').should('contain', 'Peter Jones').and('be.visible');
    cy.get('p.text-amber-600').should('contain', 'Adopted Rocky').and('be.visible');
  });

  it('autoplays through testimonials', () => {
    cy.clock();
    cy.get('h3').should('contain', 'John Doe').and('be.visible');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Jane Smith').and('be.visible');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Peter Jones').and('be.visible');
    cy.tick(5000);
    cy.get('h3').should('contain', 'John Doe').and('be.visible'); // Wraps around
  });

  it('pauses and resumes autoplay on hover', () => {
    cy.clock();
    cy.get('h3').should('contain', 'John Doe').and('be.visible');
    
    // Pause on hover
    cy.get('[data-testid="testimonials-carousel"]').trigger('mouseenter');
    cy.tick(5000);
    cy.get('h3').should('contain', 'John Doe').and('be.visible'); // Should not have changed
    
    // Resume on mouse leave
    cy.get('[data-testid="testimonials-carousel"]').trigger('mouseleave');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Jane Smith').and('be.visible'); // Should have changed
  });
});
