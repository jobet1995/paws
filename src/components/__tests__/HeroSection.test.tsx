import { render, screen } from '@testing-library/react';
import HeroSection from '../HeroSection';

describe('HeroSection', () => {
  it('renders the hero section with heading, subheading, and buttons', () => {
    render(<HeroSection />);

    // Check for the main heading
    expect(screen.getByRole('heading', { name: /Help Us Save Animals/i })).toBeInTheDocument();

    // Check for the subheading
    expect(screen.getByText(/Every pet deserves a loving home./i)).toBeInTheDocument();

    // Check for the "Adopt Now" button
    expect(screen.getByRole('link', { name: /Adopt Now/i })).toBeInTheDocument();

    // Check for the "Donate" button
    expect(screen.getByRole('link', { name: /Donate/i })).toBeInTheDocument();
  });
});
