import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import Details from '../../src/components/Details/Details';

describe('Details component', () => {
  const mockFetch = vi.fn();

  beforeEach(() => {
    globalThis.fetch = mockFetch;
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('show loader when data is loading', async () => {
    mockFetch.mockImplementation(() => new Promise(() => {}));
    render(
      <BrowserRouter>
        <Details></Details>
      </BrowserRouter>,
    );

    expect(screen.getByAltText('loader image')).toBeInTheDocument();
  });
});
