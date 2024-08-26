import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';
import ListItem from '../../src/components/ListItem/ListItem';

const mockCharacter = {
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
};

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('ListItem', () => {
  it('navigates to character details page on click', () => {
    render(
      <BrowserRouter>
        <ListItem character={mockCharacter}></ListItem>
      </BrowserRouter>,
    );

    const listItem = screen.getByTestId('result-item');
    fireEvent.click(listItem);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/item/5cd99d4bde30eff6ebccfbbe?page=1');
  });
});
