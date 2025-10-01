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
    // Mock timers to control setInterval for autoplay
    cy.clock();
    cy.mount(<TestimonialsCarousel testimonials={testimonials} />);
  });

  it('renders the initial testimonial correctly', () => {
    cy.get('h3').should('contain', 'John Doe');
    cy.get('p.text-amber-600').should('contain', 'Adopted Buddy');
  });

  it('navigates with next and previous buttons', () => {
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });
    // Tick the clock to allow React's scheduler to run and re-render the component
    cy.tick(1); 
    cy.get('h3').should('contain', 'Jane Smith');
    cy.get('p.text-amber-600').should('contain', 'Adopted Whiskers');

    cy.get('button[aria-label="Previous testimonial"]').click({ force: true });
    cy.tick(1);
    cy.get('h3').should('contain', 'John Doe');
    cy.get('p.text-amber-600').should('contain', 'Adopted Buddy');
  });

  it('navigates with indicator dots', () => {
    cy.get('button[aria-label="Go to testimonial 3"]').click({ force: true });
    cy.tick(1);
    cy.get('h3').should('contain', 'Peter Jones');
    cy.get('p.text-amber-600').should('contain', 'Adopted Rocky');
  });

  it('autoplays through testimonials', () => {
    cy.get('h3').should('contain', 'John Doe');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Jane Smith');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Peter Jones');
    cy.tick(5000);
    cy.get('h3').should('contain', 'John Doe');
  });

  it('pauses and resumes autoplay on hover', () => {
    cy.get('h3').should('contain', 'John Doe');
    
    cy.get('[data-testid="testimonials-carousel"]').trigger('mouseenter');
    cy.tick(5000);
    cy.get('h3').should('contain', 'John Doe'); // Should not have changed
    
    cy.get('[data-testid="testimonials-carousel"]').trigger('mouseleave');
    cy.tick(5000);
    cy.get('h3').should('contain', 'Jane Smith'); // Should have changed
  });
});