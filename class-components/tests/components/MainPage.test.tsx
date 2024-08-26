import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import MainPage from '../../src/pages/MainPage/MainPage';

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
});
