import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import Details from '../../src/components/Details/Details';

describe('Details component', () => {
  it('render component', async () => {
    render(
      <BrowserRouter>
        <Details></Details>
      </BrowserRouter>,
    );
    const detailsComponent = screen.getByTestId('details-component');
    expect(detailsComponent).toBeInTheDocument();
  });
});
