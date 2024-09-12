



import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ButtonComponent from './ButtonComponent';

// Test to check if the button renders with default text
test('renders button with default text', () => {
  render(<ButtonComponent />);
  const buttonElement = screen.getByText(/button/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test to check if the button renders with custom text
test('renders button with custom text', () => {
  render(<ButtonComponent buttonText="Click Me" />);
  const buttonElement = screen.getByText(/Click Me/i);
  expect(buttonElement).toBeInTheDocument();
});

// Test to check if the onClick function is called when the button is clicked
test('calls onClick function when clicked', () => {
  const onClickMock = jest.fn();  // Mock function
  render(<ButtonComponent onClick={onClickMock} />);
  const buttonElement = screen.getByText(/button/i);
  fireEvent.click(buttonElement);  // Simulate button click
  expect(onClickMock).toHaveBeenCalledTimes(1);  // Check if the function was called once
});

// Test to check if button has correct styles
test('button has correct styles', () => {
  render(<ButtonComponent heightprop="20px" widthprop="100px" backgroundColorprop="red" />);
  const buttonElement = screen.getByText(/button/i);
  expect(buttonElement).toHaveStyle({ height: '20px', width: '100px', backgroundColor: 'red' });
});
