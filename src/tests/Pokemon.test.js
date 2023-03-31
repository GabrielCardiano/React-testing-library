import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente "Pokemon"', () => {
  test('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByText(/average weight: 6\.0 kg/i);
    const pokemonImg = screen.getByRole('img', { name: /pikachu sprite/i });

    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg).toHaveAttribute('alt', 'Pikachu sprite');
    expect(pokemonImg).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testa se o card contém um link de navegação que redireciona para a página de detalhes do Pokémon', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemon/25');
  });

  test('Testa se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: /more details/i });
    userEvent.click(detailsLink);

    const favCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favCheckBox);

    const favIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
