import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Footer from '../Footer';

global.alert = jest.fn();

describe('Footer', () => {
  beforeEach(() => {
    render(<Footer />);
  });

  it('renders the footer with correct content', () => {
    expect(screen.getByText('Paws & Hearts')).toBeInTheDocument();
    expect(
      screen.getByText(/Dedicated to rescuing and rehoming animals in need/)
    ).toBeInTheDocument();
  });

  it('displays all quick links', () => {
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Animals')).toBeInTheDocument();
    expect(screen.getByText('Adopt')).toBeInTheDocument();
    expect(screen.getByText('Donate')).toBeInTheDocument();
    expect(screen.getByText('Events')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('shows the get involved section', () => {
    expect(screen.getByText('Adopt a Pet')).toBeInTheDocument();
    expect(screen.getByText('Make a Donation')).toBeInTheDocument();
    expect(screen.getByText('Volunteer')).toBeInTheDocument();
    expect(screen.getByText('Upcoming Events')).toBeInTheDocument();
  });

  it('allows users to subscribe to the newsletter', () => {
    const emailInput = screen.getByPlaceholderText('Your email address');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    expect(global.alert).toHaveBeenCalledWith(
      'Thank you for subscribing with test@example.com!'
    );
  });

  it('displays social media links', () => {
    const facebookLink = screen.getByRole('link', { name: /facebook/i });
    const instagramLink = screen.getByRole('link', { name: /instagram/i });
    const twitterLink = screen.getByRole('link', { name: /twitter/i });

    expect(facebookLink).toBeInTheDocument();
    expect(instagramLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
  });

  it('shows the copyright notice', () => {
    const copyright = screen.getByText(
      `© ${new Date().getFullYear()} Paws & Hearts Animal Shelter. All rights reserved.`
    );
    expect(copyright).toBeInTheDocument();
  });
});
