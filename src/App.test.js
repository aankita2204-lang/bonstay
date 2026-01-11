import { render, screen } from '@testing-library/react';
import App from './App';

test('renders BonStay navigation', () => {
  render(<App />);
  const navElement = screen.getByTestId('nav-bar');
  expect(navElement).toBeInTheDocument();
});
