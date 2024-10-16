// src/componant/Login/Login.test.js

import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from './Login.jsx';


test('renders Login component', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  
  const loginButton = screen.getByText('Sign in');
  expect(loginButton).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email or phone")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  
});

test("shows error messages for invalid email and password", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  
  expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  
});

test("shows error messages for invalid email and password click error", () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  
//   expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
  fireEvent.click(screen.getByRole("button", { name: "Login" }));
  
});




