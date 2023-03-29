import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import renderWithRouter from '../renderWithRouter';

describe('Testa renderização do componente "NotFound"', () => {
  test('Testa se a página contém um heading h2', () => {
    renderWithRouter(<NotFound />);

    const titleH2 = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(titleH2).toBeInTheDocument();
  });
  test('Testa se a página renderiza uma imagem', () => {
    renderWithRouter(<NotFound />);

    const SRC_IMG = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen.getByRole(
      'img',
      { name: /pikachu crying because the page requested was not found/i },
    );

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', SRC_IMG);
  });
});
