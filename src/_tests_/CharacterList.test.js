import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CharacterList from '../components/CharacterList';

describe("CharacterList", () => {
  const mockCharacters = [
    { _id: "1", name: "Frodo Baggins" },
    { _id: "2", name: "Aragorn" }
  ];

  test("renders character names", () => {
    render(<CharacterList characters={mockCharacters} onSelect={() => {}} />);
    expect(screen.getByText("Frodo Baggins")).toBeInTheDocument();
    expect(screen.getByText("Aragorn")).toBeInTheDocument();
  });

  test("calls onSelect when a character is clicked", () => {
    const onSelect = jest.fn();
    render(<CharacterList characters={mockCharacters} onSelect={onSelect} />);
    fireEvent.click(screen.getByText("Frodo Baggins"));
    expect(onSelect).toHaveBeenCalledWith(mockCharacters[0]);
  });
});
