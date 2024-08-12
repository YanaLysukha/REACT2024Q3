import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from '../../src/components/Pagination/Pagination';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as useNavigateMethodsModule from '../../src/hooks/useNavigateMethods';

vi.mock('../../src/hooks/useNavigateMethods', () => ({
  useNavigateMethods: vi.fn(),
}));

describe('Pagination component', () => {
  const TOTAL_PAGES = 10;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useNavigateMethodsModule, 'useNavigateMethods').mockImplementation(() => ({
      getPageValue: vi.fn(() => 1),
    }));
  });

  it('renders correct number of page buttons', () => {
    render(
      <BrowserRouter>
        <Pagination></Pagination>
      </BrowserRouter>,
    );

    const pageButtons = screen.getAllByRole('button');
    expect(pageButtons).toHaveLength(2 + TOTAL_PAGES);
  });

  it('disables the prev btn on the 1 page', () => {
    render(
      <BrowserRouter>
        <Pagination></Pagination>
      </BrowserRouter>,
    );

    const prevBtn = screen.getByRole('button', { name: /</i });
    expect(prevBtn).toBeDisabled();
  });

  it('disables the next btn on the last page', () => {
    vi.spyOn(useNavigateMethodsModule, 'useNavigateMethods').mockImplementation(() => ({
      getPageValue: vi.fn(() => TOTAL_PAGES),
    }));

    render(
      <BrowserRouter>
        <Pagination></Pagination>
      </BrowserRouter>,
    );

    const nextBtn = screen.getByRole('button', { name: />/i });
    expect(nextBtn).toBeDisabled();
  });
});
