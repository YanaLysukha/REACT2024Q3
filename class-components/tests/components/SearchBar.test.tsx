import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import SearchBar from '../../src/components/SearchBar/SearchBar';

const mockedUseNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const mod = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

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
      </BrowserRouter>,
    );

    const inputElement = screen.getByPlaceholderText(
      'Find your favorite character...',
    ) as HTMLInputElement;
    expect(inputElement.value).toBe('test value');
  });

  it('calls onSearch and navigate with the correct parameters when form is submitted', async () => {
    render(
      <BrowserRouter>
        <SearchBar onSearch={mockOnSearch} updateSearchValue={mockUpdateSearchValue}></SearchBar>
      </BrowserRouter>,
    )

    const input = screen.getByPlaceholderText('Find your favorite character...');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: 'Gandalf' } });
    fireEvent.submit(form);

    expect(mockOnSearch).toHaveBeenCalledWith('Gandalf');
    expect(mockedUseNavigate).toHaveBeenCalledWith('/?page=1&search=Gandalf');
  })
});
