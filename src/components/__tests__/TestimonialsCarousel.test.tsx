import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import TestimonialsCarousel from "../TestimonialsCarousel";
import { mockTestimonials } from "../../lib/mock-data";

describe("TestimonialsCarousel", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders without crashing", () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();
  });

  it("renders nothing when there are no testimonials", () => {
    const { container } = render(<TestimonialsCarousel testimonials={[]} />);
    expect(container.firstChild).toBeNull();
  });

  it("navigates through testimonials when navigation buttons are clicked", async () => {
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    await screen.findByText("“This is a great place!”");
    fireEvent.click(screen.getByLabelText("Next testimonial"));
    await waitFor(() => {
      expect(screen.getByText("“I love the staff here!”")).toBeInTheDocument();
    });
    fireEvent.click(screen.getByLabelText("Previous testimonial"));
    await waitFor(() => {
      expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();
    });
  });

  it("auto-plays through testimonials", async () => {
    jest.useFakeTimers();
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    await waitFor(() => {
      expect(screen.getByText("“I love the staff here!”")).toBeInTheDocument();
    });
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    await waitFor(() => {
      expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();
    });
  });

  it("pauses auto-play on hover", async () => {
    jest.useFakeTimers();
    render(<TestimonialsCarousel testimonials={mockTestimonials} />);
    const carousel = screen.getByTestId("testimonials-carousel");

    // Check initial state
    expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();

    // Hover over the carousel
    fireEvent.mouseEnter(carousel);

    // Advance time - should not change testimonial
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Ensure the testimonial has not changed
    expect(screen.getByText("“This is a great place!”")).toBeInTheDocument();
    expect(
      screen.queryByText("“I love the staff here!”"),
    ).not.toBeInTheDocument();

    // Mouse leaves the carousel
    fireEvent.mouseLeave(carousel);

    // Advance time again - should change testimonial
    act(() => {
      jest.advanceTimersByTime(5000);
    });

    // Wait for the next testimonial to be displayed
    await waitFor(() => {
      expect(screen.getByText("“I love the staff here!”")).toBeInTheDocument();
    });
  });
});
