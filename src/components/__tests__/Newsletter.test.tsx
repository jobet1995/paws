import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Newsletter from '../Newsletter';

global.alert = jest.fn();

describe('Newsletter', () => {
  it('allows users to subscribe to the newsletter', () => {
    render(<Newsletter />);

    const emailInput = screen.getByPlaceholderText('Enter your email address');
    const subscribeButton = screen.getByText('Subscribe');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.click(subscribeButton);

    expect(global.alert).toHaveBeenCalledWith(
      'Thank you for subscribing with test@example.com!'
    );
  });
});
