import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../../src/pages/MainPage/MainPage';
// import { mockCharacters } from '../mocks';
// import { getCharacters } from '../../src/services/getCharacters';

// vi.mock('../../src/services/getCharacters', () => ({
//   getCharacters: vi.fn(),
// }));

// export const resultsMock = [
//   {
//     name: 'Adanel',
//     url: 'https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfbbe',
//   },
//   {
//     name: 'Adrahil I',
//     url: 'https://the-one-api.dev/v2/character/5cd99d4bde30eff6ebccfbbf',
//   },
// ];

describe('Main page', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render loading state initially', () => {
    render(
      <BrowserRouter>
        <MainPage></MainPage>
      </BrowserRouter>,
    );

    const loader = screen.getByAltText('loader image');
    expect(loader).toBeInTheDocument();
  });

  // it('updates characters and shows list view after data fetch', async () => {
  //   vi.mocked(fetch).mockResolvedValueOnce({
  //     json: async () => ({ results: resultsMock }),
  //   } as Response);

  //   render(
  //     <BrowserRouter>
  //       <MainPage></MainPage>
  //     </BrowserRouter>,
  //   );

  //   await waitFor(() => {
  //     const listItems = screen.getAllByTestId('result-item');
  //     listItems.forEach((item, index) => {
  //       expect(item).toHaveTextContent(resultsMock[index].name);
  //     });
  //   });

  //   expect(screen.getByAltText('loader image')).toBeNull();
  // });
});
