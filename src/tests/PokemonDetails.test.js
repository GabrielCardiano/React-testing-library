import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa componente "PokemonsDetails"', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são renderizadas', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(pokemonDetails);

    const h2Title = screen.getByRole('heading', {
      name: /pikachu details/i,
      level: 2,
    });
    const h2Summary = screen.getByRole('heading', {
      name: /summary/i,
      level: 2,
    });
    const paragraphPokeInfo = screen.getByText(/this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i);

    expect(h2Title).toBeInTheDocument();
    expect(pokemonDetails).not.toBeInTheDocument();
    expect(h2Summary).toHaveTextContent('Summary');
    expect(paragraphPokeInfo).toBeInTheDocument();
  });

  test('Testa se existe uma seção com os mapas das localizações do Pokémon', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(pokemonDetails);

    const h2GameLocations = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
      level: 2,
    });
    const locationImage = screen.getAllByAltText(/Pikachu location/i);
    const locationName1 = screen.getByText(/kanto viridian forest/i);
    const locationName2 = screen.getByText(/kanto power plant/i);

    expect(h2GameLocations).toBeInTheDocument();

    expect(locationImage).toHaveLength(2);

    expect(locationImage[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImage[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');

    expect(locationImage[1]).toHaveAttribute('alt', 'Pikachu location');
    expect(locationImage[1]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(locationName1).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
  });

  test('Testa se o usuário pode favoritar um Pokémon na página de detalhes', () => {
    renderWithRouter(<App />);

    const pokemonDetails = screen.getByRole('link', {
      name: /more details/i });
    userEvent.click(pokemonDetails);

    const favCheckbox = screen.getByText(/pokémon favoritado\?/i);
    expect(favCheckbox).toBeInTheDocument();

    userEvent.click(favCheckbox);
    const favPokemon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favPokemon).toBeInTheDocument();

    userEvent.click(favCheckbox);
    expect(favPokemon).not.toBeInTheDocument();

    const labelCheckBox = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(labelCheckBox).toBeInTheDocument();
  });
});
