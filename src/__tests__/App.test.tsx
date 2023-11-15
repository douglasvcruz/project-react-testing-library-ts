import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/dom';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', {
    name: /home/i,
  });
  const about = screen.getByRole('link', {
    name: /about/i,
  });
  const favoritePokemon = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  expect(home).toBeInTheDocument();
  expect(about).toBeInTheDocument();
  expect(favoritePokemon).toBeInTheDocument();
});

it('Teste se a aplicação é redirecionada para a página inicial Home', async () => {
  renderWithRouter(<App />);
  const home = screen.getByRole('link', {
    name: /home/i,
  });
  await userEvent.click(home);
  const { pathname } = window.location;
  expect(pathname).toBe('/');
});
it('Teste se a aplicação é redirecionada para a página About', async () => {
  renderWithRouter(<App />);
  const about = screen.getByRole('link', {
    name: /about/i,
  });
  await userEvent.click(about);
  const { pathname } = window.location;
  expect(pathname).toBe('/about');
});
it('Teste se a aplicação é redirecionada para a página Pokémon Favoritados', async () => {
  renderWithRouter(<App />, { route: '/favorites' });
  const favoritesPoke = screen.getByRole('link', {
    name: /favorite pokémon/i,
  });
  await userEvent.click(favoritesPoke);
  const { pathname } = window.location;
  expect(pathname).toBe('/favorites');
});
it('Teste se a aplicação é redirecionada para a página Not Found ao entrar em uma URL desconhecida', () => {
  renderWithRouter(<App />, { route: '/pagina/que-nao-existe/' });
  const notFound = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  expect(notFound).toBeInTheDocument();
});
