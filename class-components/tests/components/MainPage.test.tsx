import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../../src/pages/MainPage/MainPage';
import { mockCharacters } from '../mocks';
import { getCharacters } from '../../src/services/getCharacters';

vi.mock('../../src/services/getCharacters', () => ({
  getCharacters: vi.fn(),
}));

describe('Main page', () => {
  it('should render loading state initially', () => {
    render(
      <MemoryRouter>
        <MainPage></MainPage>
      </MemoryRouter>,
    );

    const loader = screen.getByAltText('loader image');
    expect(loader).toBeInTheDocument();
  });

  it('updates characters and shows list view after data fetch', async () => {
    vi.fn().mockResolvedValueOnce(mockCharacters);

    render(
      <MemoryRouter>
        <MainPage></MainPage>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getCharacters).toHaveBeenCalled();
      expect(screen.getByText('ListView')).toBeInTheDocument();
    });
  });
});
