import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

it('Teste se a página contém um heading h2 com o texto Page requested not found', () => {
  renderWithRouter(<NotFound />);
  const notFound = screen.getByRole('heading', {
    name: /page requested not found/i,
  });
  const imgNotFound: HTMLImageElement = screen.getByRole('img', {
    name: /clefairy pushing buttons randomly with text i have no idea what i'm doing/i,
  });
  expect(notFound).toBeInTheDocument();
  expect(imgNotFound.src).toBe('http://localhost:3000/404.gif');
});
