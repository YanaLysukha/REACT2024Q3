import { beforeEach, describe, expect, it, vi } from 'vitest';
import Pagination from '../../src/components/Pagination/Pagination';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import * as useNavigateMethodsModule from '../../src/hooks/useNavigateMethods';

vi.mock('../../src/hooks/useNavigateMethods', () => ({
  useNavigateMethods: vi.fn(),
}));

const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const mod = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...mod,
    useNavigate: () => mockedUseNavigate,
  };
});

describe('Pagination component', () => {
  const TOTAL_PAGES = 10;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(useNavigateMethodsModule, 'useNavigateMethods').mockImplementation(() => ({
      getPageValue: vi.fn(() => 1),
      createSearchParams: vi.fn(() => 'page=1'),
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
      createSearchParams: vi.fn(() => 'page=1'),
    }));

    render(
      <BrowserRouter>
        <Pagination></Pagination>
      </BrowserRouter>,
    );

    const nextBtn = screen.getByRole('button', { name: />/i });
    expect(nextBtn).toBeDisabled();
  });

  it('navigates to the correct page on button click', () => {
    render(
      <BrowserRouter>
        <Pagination></Pagination>
      </BrowserRouter>,
    );

    const requiredBtn = screen.getByRole('button', { name: /2/i });
    fireEvent.click(requiredBtn);

    expect(mockedUseNavigate).toHaveBeenCalledWith('/?page=2');
  });
});
