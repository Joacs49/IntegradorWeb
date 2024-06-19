import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';

test('renders NUTRIFIT logo link', () => {
  render(
    <BrowserRouter> {/* Envuelve App en BrowserRouter */}
      <App />
    </BrowserRouter>
  );
  const linkElement = screen.getByText(/NUTRIFIT/i); // Ajusta el texto a lo que realmente estás buscando
  expect(linkElement).toBeInTheDocument();
});
