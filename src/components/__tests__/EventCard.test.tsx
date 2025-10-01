import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EventCard from '../EventCard';
import { Event } from '@/lib/data';
import { format } from 'date-fns';

const mockEvent: Event = {
  id: '1',
  title: 'Paws for a Cause Charity Gala',
  date: '2024-08-15T18:00:00.000Z',
  location: 'Grand Ballroom, Downtown',
  description: 'An evening of elegance and charity to support our furry friends.',
  type: 'Fundraiser',
  image: 'https://images.pexels.com/photos/12345/pexels-photo-12345.jpeg',
};

describe('EventCard', () => {
  it('renders the event\'s information', () => {
    render(<EventCard event={mockEvent} />);

    const formattedDate = format(new Date(mockEvent.date), 'MMMM d, yyyy');

    expect(screen.getByText('Paws for a Cause Charity Gala')).toBeInTheDocument();
    expect(screen.getByText(formattedDate)).toBeInTheDocument();
    expect(screen.getByText('Grand Ballroom, Downtown')).toBeInTheDocument();
    expect(screen.getByText('Fundraiser')).toBeInTheDocument();

    const image = screen.getByAltText('Paws for a Cause Charity Gala');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/_next/image?url=https%3A%2F%2Fimages.pexels.com%2Fphotos%2F12345%2Fpexels-photo-12345.jpeg&w=3840&q=75'
    );
  });
});
