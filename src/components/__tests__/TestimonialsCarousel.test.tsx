import { render, screen, fireEvent } from '@testing-library/react';
import TestimonialsCarousel from '../TestimonialsCarousel';

// --- Mocking Setup ---

// 1. Mock the data module that the component imports
// We define a default mock state here.
jest.mock('@/lib/data', () => ({
  __esModule: true,
  testimonials: [
    {
      id: '1',
      name: 'Jennifer Williams',
      text: 'Adopting Luna was the best decision we ever made.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200',
      animal: 'Luna - Siamese Cat',
    },
    {
      id: '2',
      name: 'David Thompson',
      text: 'The adoption process was smooth, and the staff were incredibly helpful.',
      image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
      animal: 'Charlie - Beagle Mix',
    },
  ],
}));

// 2. Mock the next/image component which doesn't work in a Jest environment
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// --- Test Suites ---

describe('TestimonialsCarousel with Data', () => {
  beforeEach(() => {
    // Render the component before each test in this suite
    render(<TestimonialsCarousel />);
  });

  it('renders the first testimonial on initial load', () => {
    expect(screen.getByText('Jennifer Williams')).toBeInTheDocument();
    expect(
      screen.getByText('Adopted Luna - Siamese Cat')
    ).toBeInTheDocument();
    expect(screen.getByAltText('Jennifer Williams')).toBeInTheDocument();
  });

  it('navigates to the next testimonial when the "Next" button is clicked', () => {
    const nextButton = screen.getByLabelText('Next testimonial');
    
    // Initially Jennifer is visible
    expect(screen.getByText('Jennifer Williams')).toBeInTheDocument();

    // Click next
    fireEvent.click(nextButton);

    // Now David should be visible
    expect(screen.getByText('David Thompson')).toBeInTheDocument();
    expect(
      screen.getByText('Adopted Charlie - Beagle Mix')
    ).toBeInTheDocument();
  });

  it('wraps around to the first testimonial after reaching the end', () => {
    const nextButton = screen.getByLabelText('Next testimonial');

    // Go to the last testimonial (David)
    fireEvent.click(nextButton);
    expect(screen.getByText('David Thompson')).toBeInTheDocument();

    // Click again to wrap around to the first one (Jennifer)
    fireEvent.click(nextButton);
    expect(screen.getByText('Jennifer Williams')).toBeInTheDocument();
  });

  it('navigates to the previous testimonial when the "Previous" button is clicked', () => {
    const prevButton = screen.getByLabelText('Previous testimonial');

    // Initially on the first item, clicking previous should wrap to the last item (David)
    fireEvent.click(prevButton);
    expect(screen.getByText('David Thompson')).toBeInTheDocument();
  });
});

describe('TestimonialsCarousel without Data', () => {
  it('renders nothing when the testimonials array is empty', () => {
    // For this specific test, we override the default mock with an empty array.
    // jest.doMock is used for this dynamic change.
    jest.doMock('@/lib/data', () => ({
      __esModule: true,
      testimonials: [],
    }));

    const { container } = render(<TestimonialsCarousel />);

    // The component should render null due to the guard clause we added
    expect(container.firstChild).toBeNull();
  });
});
