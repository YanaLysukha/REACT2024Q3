import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import ListView from '../../src/components/ListView/ListView';
import { mockCharacters } from '../mocks';
import { BrowserRouter } from 'react-router-dom';

describe('ListView', () => {
  it('should render no characters when the characters array is empty', () => {
    render(
      <BrowserRouter>
        <ListView characters={[]}></ListView>
      </BrowserRouter>,
    );

    const errorMessage = screen.getByText(/characters you seek are momentarily out of reach/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render characters', () => {
    render(
      <BrowserRouter>
        <ListView characters={mockCharacters}></ListView>
      </BrowserRouter>,
    );

    const list = screen.getByRole('view');
    expect(list).toBeInTheDocument();
  });
});
