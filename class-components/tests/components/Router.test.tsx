import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import MainPage from '../../src/pages/MainPage/MainPage';
import { BrowserRouter, createMemoryRouter, RouterProvider } from 'react-router-dom';
import Details from '../../src/components/Details/Details';
import ErrorPage from '../../src/pages/ErrorPage/ErrorPage';

describe('router', () => {
  const routes = [
    {
      path: '/',
      element: <MainPage />,
      children: [
        {
          path: 'item/:itemId',
          element: <Details />,
        },
      ],
    },
    {
      path: '*',
      element: <ErrorPage />,
    },
  ];

  it('render main page', () => {
    render(<MainPage></MainPage>, { wrapper: BrowserRouter });

    expect(screen.getByTestId('main-component')).toBeInTheDocument();
  });

  it('landing on a bad page', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/unknown-path'],
    });
    render(<RouterProvider router={router} />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('render details', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/item/5cd99d4bde30eff6ebccfbbe'],
    });
    render(<RouterProvider router={router}></RouterProvider>);

    expect(screen.getByTestId('details-component')).toBeInTheDocument();
  });
});
