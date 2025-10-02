import { render, screen, fireEvent, act } from '@testing-library/react';
import TestimonialsCarousel from '../TestimonialsCarousel';

// Mock next/image to handle the `fill` prop and prevent React warnings.
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    const { fill, ...rest } = props;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} />;
  },
}));

// Mock the data module. We will control its output for different test cases.
jest.mock('@/lib/data', () => ({
  __esModule: true,
  testimonials: [],
}));

const mockedData = require('@/lib/data');

describe('TestimonialsCarousel', () => {
  // Use Jest's fake timers to control setInterval.
  beforeAll(() => {
    jest.useFakeTimers();
  });

  // Clear timers after each test to prevent leaking.
  afterEach(() => {
    jest.clearAllTimers();
  });

  // Restore real timers when all tests in this file are complete.
  afterAll(() => {
    jest.useRealTimers();
  });

  describe('with Data', () => {
    beforeEach(() => {
      // Provide a full list of testimonials for this test suite.
      mockedData.testimonials = [
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
      // Provide an empty array for this test.
      mockedData.testimonials = [];
      const { container } = render(<TestimonialsCarousel />);
      // The guard clause in the component should ensure it returns null.
      expect(container.firstChild).toBeNull();
    });
  });
});
