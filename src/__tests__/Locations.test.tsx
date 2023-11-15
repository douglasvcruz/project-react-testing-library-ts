import { screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import renderWithRouter from '../renderWithRouter';
import Locations from '../pages/Locations';
import mockFetch from '../__mocks__/mockFetch';

describe('Testando a rota /locations', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    vi.spyOn(global, 'fetch').mockImplementation(mockFetch);
  });
  it('Teste se é exibida na tela a mensagem location pokedex', async () => {
    renderWithRouter(<Locations />);
    const locationText = screen.getByRole('heading', {
      name: /location pokédex/i,
    });
    expect(locationText).toBeInTheDocument();
  });
  it('Teste se é renderizado as locations', async () => {
    renderWithRouter(<Locations />);
    await waitFor(() => {
      const canalaveCity = screen.getByTestId('canalave-city');
      expect(canalaveCity).toBeInTheDocument();
    });
  });
  it('Teste os botões next e previous', async () => {
    const { user } = renderWithRouter(<Locations />);
    const nextButton = screen.getByRole('button', {
      name: /next/i,
    });
    await waitFor(() => {
      expect(nextButton).not.toHaveAttribute('disabled');
    });
    const prevButton = screen.getByRole('button', {
      name: /previous/i,
    });
    await waitFor(() => {
      expect(prevButton).toHaveAttribute('disabled');
    });
    await user.click(nextButton);
    expect(prevButton).not.toHaveAttribute('disabled');
    expect(nextButton).not.toHaveAttribute('disabled');
    const location = screen.getByTestId('old-chateau');
    expect(location).toBeInTheDocument();
    await user.click(nextButton);
    const sinnohRoute211 = screen.getByTestId('sinnoh-route-211');
    expect(sinnohRoute211).toBeInTheDocument();
    await user.click(prevButton);
    await user.click(prevButton);
    const canalaveCity = screen.getByTestId('canalave-city');
    expect(canalaveCity).toBeInTheDocument();
  });
});
