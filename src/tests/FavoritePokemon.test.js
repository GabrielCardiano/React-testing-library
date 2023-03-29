import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

describe('Testa o componente "FavoritePokemon"', () => {
  test('Testa se exibe a mensagem "No favorite pokemon found" caso a não exista nenhum pokemon favorito', () => {
    renderWithRouter(<FavoritePokemon pokemonList="" />);

    const noFavPokemons = screen.getByText(/no favorite pokémon found/i);

    expect(noFavPokemons).toBeInTheDocument();
  });

  test('Apenas os pokemons favoritados devem ser exibidos', () => {
    renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);

    const pokemonName = screen.getByText(/dragonair/i);
    const pokemonImage = screen.getByRole('img', { name: /dragonair sprite/i });
    const pokemnonFavIcon = screen.getByRole('img', { name: /dragonair is marked as favorite/i });

    expect(pokemonName).toBeInTheDocument();
    expect(pokemonImage).toBeInTheDocument();
    expect(pokemnonFavIcon).toBeInTheDocument();
  });
});
