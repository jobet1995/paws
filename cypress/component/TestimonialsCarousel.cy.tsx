import TestimonialsCarousel, { Testimonial } from '../../src/components/TestimonialsCarousel';

const testimonials: Testimonial[] = [
  {
    name: 'John Doe',
    animal: 'Buddy',
    image: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=200',
    text: 'Adopting Buddy was the best decision of our lives. He brings so much joy and laughter to our home.',
  },
];

describe('<TestimonialsCarousel />', () => {
  beforeEach(() => {
    cy.mount(<TestimonialsCarousel testimonials={testimonials} autoplay={false} />);
  });

  it('renders the initial testimonial correctly', () => {
    cy.get('h3').should('contain', 'John Doe');
    cy.get('p.text-amber-600').should('contain', 'Adopted Buddy');
  });

  it('does not navigate when there is only one testimonial', () => {
    // Buttons might be hidden or disabled, but we can check if the content doesn't change
    cy.get('button[aria-label="Next testimonial"]').click({ force: true });
    cy.get('h3').should('contain', 'John Doe');

    cy.get('button[aria-label="Previous testimonial"]').click({ force: true });
    cy.get('h3').should('contain', 'John Doe');
  });
});
