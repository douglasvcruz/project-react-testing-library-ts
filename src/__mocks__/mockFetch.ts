import locations from './locations';
import locationsMiddle from './locationsMiddle';
import locationsNext from './locationsNext';

type MyRequestInfo = Parameters<typeof fetch>[0];
const mockFetch = async (url: MyRequestInfo): Promise<Response> => {
  console.log(url);
  if (url === 'https://pokeapi.co/api/v2/location') {
    return {
      json: async () => locations,
    } as Response;
  }

  if (url === 'https://pokeapi.co/api/v2/location?offset=20&limit=20') {
    return {
      json: async () => locationsMiddle,
    } as Response;
  }

  if (url === 'https://pokeapi.co/api/v2/location?offset=40&limit=20') {
    return {
      json: async () => locationsNext,
    } as Response;
  }

  if (url === 'https://pokeapi.co/api/v2/location?offset=0&limit=20') {
    return {
      json: async () => locations,
    } as Response;
  }

  throw new Error('Houve algo de errado com o endpoint, verifique se ele está correto');
};

export default mockFetch;
