import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AnimalCard from '../AnimalCard';
import { Animal } from '@/lib/data';

const mockAnimal: Animal = {
  id: '1',
  name: 'Fido',
  species: 'Dog',
  breed: 'Golden Retriever',
  age: 3,
  size: 'Large',
  gender: 'Male',
  description: 'A friendly and playful dog.',
  personality: ['Friendly', 'Playful'],
  healthInfo: 'Fully vaccinated',
  adoptionStatus: 'Available',
  image: 'https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg',
};

describe('AnimalCard', () => {
  it('renders the animal\'s information', () => {
    render(<AnimalCard animal={mockAnimal} />);

    expect(screen.getByText('Fido')).toBeInTheDocument();
    expect(screen.getByText('Available')).toBeInTheDocument();

    const image = screen.getByAltText('Fido');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      '/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F12345%2Fpexels-photo-12345.jpeg&w=3840&q=75'
    );
  });
});
