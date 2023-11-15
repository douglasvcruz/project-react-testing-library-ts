import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemonList from '../data';

it('Teste se a página contém um heading h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);
  const heading = screen.getByRole('heading', {
    name: /encountered pokémon/i,
  });
  expect(heading).toBeInTheDocument();
});
describe('teste se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
  it('O botão deve conter o texto Próximo Pokémon', () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(button.innerHTML).toBe('Próximo Pokémon');
  });
  it('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista', async () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    for (let i = 0; i < 9; i += 1) {
      userEvent.click(button);
    }
    await waitFor(() => {
      const poke = screen.queryByRole('img', {
        name: /pikachu sprite/i,
      });
      expect(poke).toBeInTheDocument();
    });
  });
});
it('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);
  const type = screen.getAllByTestId('pokemon-type');
  expect(type.length).toBe(1);
});
describe('Teste se a Pokédex tem os botões de filtro', () => {
  it('O texto do botão deve corresponder ao nome do tipo', () => {
    renderWithRouter(<App />);
    const types = screen.getAllByTestId('pokemon-type-button');
    expect(types[0]).toHaveTextContent('Electric');
    expect(types[1]).toHaveTextContent('Fire');
    expect(types[2]).toHaveTextContent('Bug');
    expect(types[3]).toHaveTextContent('Poison');
    expect(types[4]).toHaveTextContent('Psychic');
    expect(types[5]).toHaveTextContent('Normal');
    expect(types[6]).toHaveTextContent('Dragon');
  });
  it('A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos Pokémon daquele tipo', async () => {
    renderWithRouter(<App />);
    const button = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    const all = screen.getByRole('button', {
      name: /all/i,
    });
    const types = screen.getAllByTestId('pokemon-type-button');
    await userEvent.click(types[1]);
    const poke = screen.getByText(/charmander/i);
    expect(poke).toBeInTheDocument();
    expect(all).toBeInTheDocument();
    await userEvent.click(button);
    const poke2 = screen.getByText(/rapidash/i);
    expect(poke2).toBeInTheDocument();
    expect(all).toBeInTheDocument();
  });
});
describe('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', async () => {
    renderWithRouter(<App />);
    const reset = screen.getByRole('button', {
      name: /all/i,
    });
    expect(reset.innerHTML).toBe('All');
    await userEvent.click(reset);
    const poke = screen.getByText(/pikachu/i);
    expect(poke).toBeInTheDocument();
  });
});
