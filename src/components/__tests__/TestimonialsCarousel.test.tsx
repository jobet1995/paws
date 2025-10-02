import { render, screen, fireEvent, act } from '@testing-library/react';
import TestimonialsCarousel from '../TestimonialsCarousel';
import { ImageProps } from 'next/image';
import { Testimonial } from '@/lib/data';

// This is the mutable array that our mock will use. We can change it in our tests.
let mockTestimonials: Testimonial[] = [];

// Mock the data module. The mock has a getter for 'testimonials' that returns our mutable array.
// This allows us to change the data source from within our tests.
jest.mock('@/lib/data', () => ({
  __esModule: true,
  // Use a getter to ensure the mock always returns the latest value of mockTestimonials
  get testimonials() {
    return mockTestimonials;
  },
}));

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: ImageProps) => {
    // Destructure alt explicitly to satisfy the linter
    const { src, alt, fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src as string} alt={alt} {...rest} />;
  },
}));

describe('TestimonialsCarousel', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    // Reset the mock data after each test to ensure isolation
    mockTestimonials = [];
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  describe('with Data', () => {
    beforeEach(() => {
      // Set the data for this test suite
      mockTestimonials = [
        { id: '1', name: 'Jennifer Williams', text: 'Text 1', image: 'img1', animal: 'Cat' },
        { id: '2', name: 'David Thompson', text: 'Text 2', image: 'img2', animal: 'Dog' },
      ];
      render(<TestimonialsCarousel />);
    });

    it('renders the first testimonial on initial load', () => {
      expect(screen.getByText('Jennifer Williams')).toBeInTheDocument();
      expect(screen.getByText('Adopted Cat')).toBeInTheDocument();
    });

    it('navigates to the next testimonial on button click', () => {
      fireEvent.click(screen.getByLabelText('Next testimonial'));
      expect(screen.getByText('David Thompson')).toBeInTheDocument();
    });

    it('advances testimonials automatically via timer', () => {
      expect(screen.getByText('Jennifer Williams')).toBeInTheDocument();
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      expect(screen.getByText('David Thompson')).toBeInTheDocument();
    });
  });

  describe('without Data', () => {
    it('renders nothing when the testimonials array is empty', () => {
      // The mock is already an empty array by default and due to afterEach
      const { container } = render(<TestimonialsCarousel />);
      expect(container.firstChild).toBeNull();
    });
  });
});
