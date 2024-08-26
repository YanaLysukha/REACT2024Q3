import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import Details from '../../src/components/Details/Details';

vi.mock('react-router-dom', async (importOriginal): Promise<object> => {
  const actual = await importOriginal();
  return {
    ...(actual as object),
    useNavigate: (): void => {
      vi.fn();
    },
    useParams: () => ({ itemId: '5cd99d4bde30eff6ebccfbbe' }),
  };
});

vi.mock('../../src/services/getCharacters', () => ({
  getCharacterById: vi.fn().mockResolvedValue({
    _id: '5cd99d4bde30eff6ebccfbbe',
    name: 'Adanel',
    wikiUrl: 'http://lotr.wikia.com//wiki/Adanel',
    race: 'Human',
    birth: null,
    gender: 'Female',
    death: null,
    hair: null,
    height: null,
    realm: null,
    spouse: 'Belemir',
  }),
}));

vi.mock('../../src/hooks/useNavigateMethods', () => ({
  useNavigateMethods: () => ({
    getPageValue: vi.fn().mockReturnValue({}),
    createSearchParams: vi.fn().mockReturnValue('mockSearchParams'),
  }),
}));

describe('Details component', () => {
  it('render component', async () => {
    render(
      <BrowserRouter>
        <Details></Details>
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Adanel')).toBeInTheDocument();
      expect(screen.getByText('Human')).toBeInTheDocument();
      expect(screen.getByText('Female')).toBeInTheDocument();
      expect(screen.getByText('Belemir')).toBeInTheDocument();
    });
  });
});
