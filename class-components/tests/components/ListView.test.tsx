import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';
import { describe, expect, it, vi } from "vitest";
import ListView from '../../src/components/ListView/ListView';

const mockHandleCharacter = vi.fn().mockResolvedValue(undefined);

describe('ListView', () => {
    it('should render no characters when the characters array is empty', () => {
        render(<ListView characters={[]} handleCharacter={mockHandleCharacter} />);

        expect(screen.getByText(/no characters/i)).toBeInTheDocument();
    });
})