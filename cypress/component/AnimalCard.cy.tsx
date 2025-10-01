import AnimalCard from '../../src/components/AnimalCard';
import { Animal } from '../../src/lib/data';

describe('<AnimalCard />', () => {
  it('renders', () => {
    const animal: Animal = {
      id: '1',
      name: 'Buddy',
      image: '/placeholder.svg',
      adoptionStatus: 'Available',
      breed: 'Golden Retriever',
      age: 2,
      size: 'Large',
      gender: 'Male',
      description: 'A friendly and playful dog.',
      species: 'Dog',
      personality: ['Friendly', 'Playful'],
      healthInfo: 'Up to date on shots'
    };
    cy.mount(<AnimalCard animal={animal} />);
    cy.contains('h3', 'Buddy').should('be.visible');
  });
});
