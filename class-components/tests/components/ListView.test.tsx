import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { describe, expect, it } from 'vitest';
import ListView from '../../src/components/ListView/ListView';
import { mockCharacters } from '../mocks';

describe('ListView', () => {
  it('should render no characters when the characters array is empty', () => {
    render(<ListView characters={[]} />);

    const errorMessage = screen.getByText(/characters you seek are momentarily out of reach/i);
    expect(errorMessage).toBeInTheDocument();
  });

  it('should render characters', () => {
    render(<ListView characters={mockCharacters}></ListView>);

    const list = screen.getByRole('item');
    expect(list).toBeInTheDocument();
  });
});
