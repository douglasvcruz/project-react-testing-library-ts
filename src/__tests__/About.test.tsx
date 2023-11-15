import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../pages/About';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
    });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const pokeText = screen.getByText(
      /this application simulates a pokédex, a digital encyclopedia containing all pokémon/i,
    );
    const pokeText2 = screen.getByText(
      /one can filter pokémon by type, and see more details for each one of them/i,
    );
    expect(pokeText).toBeInTheDocument();
    expect(pokeText2).toBeInTheDocument();
  });
  it('Teste se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const img: HTMLImageElement = screen.getByRole('img', {
      name: /pokédex/i,
    });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
