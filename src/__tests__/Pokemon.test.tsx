import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste se é renderizado um card com as informações de determinado Pokémon', () => {
  it('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();
  });
  it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<App />);
    const pokeType = screen.getAllByTestId('pokemon-type');
    expect(pokeType[0]).toHaveTextContent('Electric');
  });
  it('O peso médio do Pokémon deve ser exibido', () => {
    renderWithRouter(<App />);
    const averageWeight = screen.getByText(/average weight: 6\.0 kg/i);
    expect(averageWeight).toBeInTheDocument();
  });
  it('A imagem do Pokémon deve ser exibida', () => {
    renderWithRouter(<App />);
    const img: HTMLImageElement = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(
      'https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png',
    );
    expect(img.alt).toBe('Pikachu sprite');
  });
});
it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon', () => {
  renderWithRouter(<App />);
  const moreDetails: HTMLLinkElement = screen.getByRole('link', {
    name: /more details/i,
  });
  expect(moreDetails.href).toBe('http://localhost:3000/pokemon/25');
});
it('Teste se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  userEvent.click(moreDetails);
  const pageDetails = screen.getByRole('heading', {
    name: /pokédex/i,
  });
  expect(pageDetails).toBeInTheDocument();
});
it('Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', async () => {
  renderWithRouter(<App />);
  const moreDetails = screen.getByRole('link', {
    name: /more details/i,
  });
  await userEvent.click(moreDetails);
  const { pathname } = window.location;
  expect(pathname).toBe('/pokemon/25');
});
describe('Teste se existe um ícone de estrela nos Pokémon favoritados', () => {
  it('O ícone deve ser uma imagem com o atributo src de caminho /star-icon.svg e alt igual a <Pokemon> is marked as favorite', async () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    await userEvent.click(moreDetails);
    const favorite = screen.getByText(/pokémon favoritado\?/i);
    await userEvent.click(favorite);
    const favoriteMarked: HTMLImageElement = screen.getByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(favoriteMarked.src).toBe('http://localhost:3000/star-icon.png');
    expect(favoriteMarked.alt).toBe('Pikachu is marked as favorite');
  });
});
