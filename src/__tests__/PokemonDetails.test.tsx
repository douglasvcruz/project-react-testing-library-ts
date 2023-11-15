import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const PIKACHU_ROUTE = '/pokemon/25';

describe('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
  it('A página deve conter um texto Pikachu Details, em que Pikachu é o nome do Pokémon', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const pikachu = screen.getByRole('heading', {
      name: /pikachu details/i,
    });
    expect(pikachu).toBeInTheDocument();
  });
  it('Não deve existir o link de navegação para os detalhes do Pokémon selecionado.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const buttonDetails = screen.queryByRole('link', {
      name: /more details/i,
    });
    expect(buttonDetails).not.toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um heading h2 com o texto Summary', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const h2 = screen.getByRole('heading', {
      name: /summary/i,
    });
    expect(h2).toBeInTheDocument();
  });
  it('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const details = screen.getByText(
      /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i,
    );
    expect(details).toBeInTheDocument();
  });
});

describe('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon', () => {
  it('Na seção de detalhes, deverá haver um heading h2 com o texto Game Locations of Pikachu; em que Pikachu é o nome do Pokémon exibido.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });

    const summary = screen.getByRole('heading', {
      name: /game locations of pikachu/i,
    });
    expect(summary).toBeInTheDocument();
  });
  it('Todas as localizações do Pokémon devem ser mostradas na seção de detalhes.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const img: HTMLImageElement[] = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(img.length).toBe(2);
  });
  it('Devem ser exibidos o nome da localização e uma imagem do mapa em cada localização.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const kantoViridianForest = screen.getByText(/kanto viridian forest/i);
    const kantoPowerPlant = screen.getByText(/kanto power plant/i);
    const img: HTMLImageElement[] = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(img[0] && img[1]).toBeInTheDocument();
    expect(kantoViridianForest).toBeInTheDocument();
    expect(kantoPowerPlant).toBeInTheDocument();
  });
  it('A imagem da localização deve ter um atributo src com a URL da localização.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const img: HTMLImageElement[] = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(img[0].src).toBe(
      'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png',
    );
    expect(img[1].src).toBe(
      'https://archives.bulbagarden.net/media/upload/b/bd/Kanto_Celadon_City_Map.png',
    );
  });
  it('A imagem da localização deve ter um atributo alt com o texto Pikachu location, em que Pikachu é o nome do Pokémon.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const img: HTMLImageElement[] = screen.getAllByRole('img', {
      name: /Pikachu location/i,
    });
    expect(img[0].alt).toBe('Pikachu location');
    expect(img[1].alt).toBe('Pikachu location');
  });
});

describe('Teste se o usuário pode favoritar um Pokémon por meio da página de detalhes', () => {
  it('A página deve exibir um checkbox que permite favoritar o Pokémon.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const checkboxFavoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    expect(checkboxFavoritePokemon).toBeInTheDocument();
  });
  it('Cliques alternados no checkbox devem adicionar e remover, respectivamente, o Pokémon da lista de favoritos.', async () => {
    const { user } = renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const checkboxFavoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    await user.click(checkboxFavoritePokemon);
    const isFavorite = screen.queryByRole('img', {
      name: /pikachu is marked as favorite/i,
    });
    expect(isFavorite).toBeInTheDocument();
    await user.click(checkboxFavoritePokemon);
    expect(isFavorite).not.toBeInTheDocument();
  });
  it('O label do checkbox deve conter o texto Pokémon favoritado?.', () => {
    renderWithRouter(<App />, { route: PIKACHU_ROUTE });
    const labelFavoritePokemon = screen.getByText(/pokémon favoritado\?/i);
    expect(labelFavoritePokemon).toBeInTheDocument();
  });
});
