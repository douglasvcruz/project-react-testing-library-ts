import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemon from '../pages/FavoritePokemon';
import pokemonList from '../data';

it('Teste se é exibida na tela a mensagem No favorite pokemon found, caso a pessoa não tenha Pokémon favoritos', () => {
  renderWithRouter(<FavoritePokemon />);
  const noFound = screen.getByText(/no favorite pokémon found/i);
  expect(noFound).toBeInTheDocument();
});
it('Teste se são exibidos todos os cards de Pokémon favoritados', () => {
  renderWithRouter(<FavoritePokemon pokemonList={ pokemonList } />);
  pokemonList.forEach(({ name }) => {
    const favorite = screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    });
    expect(favorite).toBeInTheDocument();
  });
});
