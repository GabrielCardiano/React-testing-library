import React from 'react';
import { screen } from '@testing-library/react';
import About from '../pages/About';
import renderWithRouter from '../renderWithRouter';

describe('testa se o componente About renderiza todas as informações sobre a Pokédex', () => {
  test('Testa se a página contém um heading h2', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle).toHaveTextContent('About Pokédex');
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const p1About = screen.getByText(/this application simulates a pokédex, a digital encyclopedia containing all pokémon/i);
    const p2About = screen.getByText(/one can filter pokémon by type, and see more details for each one of them/i);

    const p1Txt = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémon';
    const p2Txt = 'One can filter Pokémon by type, and see more details for each one of them';
    expect(p1About).toBeInTheDocument();
    expect(p1About).toHaveTextContent(p1Txt);
    expect(p2About).toBeInTheDocument(p2Txt);
  });

  test('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);

    const SRC_IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgAbout = screen.getByRole('img', { name: /pokédex/i });

    expect(imgAbout).toBeInTheDocument();
    expect(imgAbout).toHaveAttribute('src', SRC_IMG);
  });
});
