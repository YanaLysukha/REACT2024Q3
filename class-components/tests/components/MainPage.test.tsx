import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../../src/pages/MainPage/MainPage';

describe('Main page', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
    localStorage.clear();
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

  // change test
  it('updates search value in localStorage on search', async () => {
    render(
      <BrowserRouter>
        <MainPage></MainPage>
      </BrowserRouter>,
    );

    const input = screen.getByPlaceholderText('Find your favorite character...');
    fireEvent.change(input, { target: { value: 'Gandalf' } });
    fireEvent.submit(screen.getByRole('form'));

    await waitFor(() => {
      expect(localStorage.getItem('value')).toBe('Gandalf');
    });
  });
});
