import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  test('Testa os links para as rotas da aplicação são renderizados', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    const aboutLink = screen.getByRole('link', { name: /About/i });
    const favoritePokemonLink = screen.getByRole('link', { name: /Favorite Pokémon/i });

    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveTextContent('Home');

    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveTextContent('About');

    expect(favoritePokemonLink).toBeInTheDocument();
    expect(favoritePokemonLink).toHaveTextContent('Favorite Pokémon');
  });

  test('Ao clicar em "Home" é redirecionado para a rota "/home"', () => {
    const { history } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /Home/i });
    userEvent.click(homeLink);

    const { location: { pathname } } = history;
    const homeTitle = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });

    expect(pathname).toBe('/');
    expect(homeTitle).toBeInTheDocument();
    expect(homeTitle).toHaveTextContent('Encountered Pokémon');
  });

  test('Ao clicar e "About" é redirecionado para a rota "/about"', () => {
    const { history } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /About/i });
    userEvent.click(aboutLink);

    const { location: { pathname } } = history;
    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });

    expect(pathname).toBe('/about');
    expect(aboutTitle).toBeInTheDocument();
    expect(aboutTitle).toHaveTextContent('About Pokédex');
  });

  test('Ao clicar e "Favorite Pokémon" é redirecionado para a rota "/favorites"', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemonLink = screen.getByRole('link', { name: /favorite pokémon/i });
    userEvent.click(favoritePokemonLink);

    const { location: { pathname } } = history;
    const favoritesTitle = screen.getByRole('heading', {
      name: /favorite pokémon/i,
      level: 2,
    });

    expect(pathname).toBe('/favorites');
    expect(favoritesTitle).toBeInTheDocument();
    expect(favoritesTitle).toHaveTextContent('Favorite Pokémon');
  });

  test('Testa se é renderizda uma página "NOT FOUND" caso o caminho não seja existente', () => {
    const { history } = renderWithRouter(<App />);

    act(() => {
      history.push('/caminho/inexistente');
    });

    const notFoundTitle = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    const notFoundImg = screen.getByRole('img', { name: /pikachu crying because the page requested was not found/i });

    expect(notFoundTitle).toBeInTheDocument();
    expect(notFoundTitle).toHaveTextContent('Page requested not found');
    expect(notFoundImg).toBeInTheDocument();
  });
});
