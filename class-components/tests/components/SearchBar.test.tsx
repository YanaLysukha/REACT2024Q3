import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../../src/components/SearchBar/SearchBar';

describe('Search bar component', () => {
  const mockOnSearch = vi.fn(() => Promise.resolve());
  const mockUpdateSearchValue = vi.fn();

  beforeEach(() => {
    localStorage.setItem('value', 'test value');
    mockOnSearch.mockClear();
    mockUpdateSearchValue.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('renders the search input with initial value from localStorage', () => {
    render(
      <BrowserRouter>
        <SearchBar onSearch={mockOnSearch} updateSearchValue={mockUpdateSearchValue}></SearchBar>
      </BrowserRouter>
    )

    const inputElement = screen.getByPlaceholderText('Find your favorite character...') as HTMLInputElement;
    expect(inputElement.value).toBe('test value');
  });
});