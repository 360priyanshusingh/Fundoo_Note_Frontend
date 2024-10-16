// src/App.test.js

import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import App from './App';


afterEach(() => {
  cleanup();
});

test('renders Fundo title', () => {
  render(<App />);
  const titleElement = screen.getByText('Fundo');
  expect(titleElement).toBeInTheDocument();
});
