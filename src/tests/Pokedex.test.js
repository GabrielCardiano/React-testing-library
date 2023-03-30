import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

describe('Testa a renderização do componente "Pokedéx" ', () => {
  test('Testa se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);

    const titleH2 = screen.getByRole('heading', { name: /Encountered Pokémon/i,
      level: 2,
    });

    expect(titleH2).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPokemonBtn = screen.getByRole('button', { name: /próximo pokémon/i });

    pokemonList.forEach((pokemon) => {
      const pokemonName = screen.getByText(pokemon.name);
      expect(pokemonName).toBeInTheDocument();
      userEvent.click(nextPokemonBtn);
    });

    expect(nextPokemonBtn).toBeInTheDocument();
    expect(nextPokemonBtn).toHaveTextContent('Próximo Pokémon');
  });

  test('Testa se é mostrado apenas um Pokémon por vez;', () => {
    renderWithRouter(<App />);

    const pokemonImage = screen.getAllByRole('img', {
      name: /pikachu sprite/i,
    });

    expect(pokemonImage).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro por tipo', () => {
    renderWithRouter(<App />);

    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    const allBtn = screen.getByRole('button', { name: /all/i });

    expect(filterButtons).toHaveLength(7);
    expect(allBtn).toBeInTheDocument();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allBtn = screen.getByRole('button', { name: /all/i });
    expect(allBtn).toBeInTheDocument();

    const pokemonType = screen.getByTestId('pokemon-type');
    const dragonBtn = screen.getByRole('button', { name: /dragon/i });

    userEvent.click(dragonBtn);
    expect(pokemonType).toHaveTextContent('Dragon');

    userEvent.click(allBtn);
    expect(pokemonType).toHaveTextContent('Electric');
  });
});
