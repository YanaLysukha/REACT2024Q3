import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Loader from "../../src/components/Loader/Loader";

describe('Loader component', () => {
  it('should renders loader', () => {
    render(<Loader></Loader>);
    const loaderIcon = screen.getByRole('img');
    expect(loaderIcon).toBeInTheDocument();
  })
});