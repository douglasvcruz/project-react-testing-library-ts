import mockFetch from '../__mocks__/mockFetch'; // Suponha que o arquivo mockFetch está neste diretório

describe('Testando mockFetch', () => {
  it('deve lançar um erro para URL não suportada', async () => {
    const unsupportedURL = 'https://pokeapi.co/api/v2/unsupported'; // URL não suportada
    const unsupportedApi = mockFetch(unsupportedURL);
    await expect(unsupportedApi).rejects.toThrow('Houve algo de errado com o endpoint, verifique se ele está correto');
  });
});
