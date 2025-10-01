import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '../Navbar';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = require('next/navigation').usePathname;

describe('Navbar', () => {
  it('renders the logo and navigation links', () => {
    mockUsePathname.mockImplementation(() => '/');
    render(<Navbar />);

    const logo = screen.getByText('Paws & Hearts Shelter');
    expect(logo).toBeInTheDocument();

    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();

    const animalsLink = screen.getByText('Animals');
    expect(animalsLink).toBeInTheDocument();

    const adoptLink = screen.getByText('Adopt');
    expect(adoptLink).toBeInTheDocument();

    const donateLink = screen.getByText('Donate');
    expect(donateLink).toBeInTheDocument();

    const eventsLink = screen.getByText('Events');
    expect(eventsLink).toBeInTheDocument();

    const blogLink = screen.getByText('Blog');
    expect(blogLink).toBeInTheDocument();

    const contactLink = screen.getByText('Contact');
    expect(contactLink).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    mockUsePathname.mockImplementation(() => '/animals');
    render(<Navbar />);

    const animalsLink = screen.getByText('Animals');
    expect(animalsLink).toHaveClass('text-amber-600');
  });
});
