
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Result from '../Result';
import { useQuery } from '@apollo/client';


const bulbasaurMock = {
  id: '1',
  number: '001',
  name: 'Bulbasaur',
  types: ['Grass', 'Poison'],
  evolutions: [],
};

const charmanderMock = {
  id: '4',
  number: '004',
  name: 'Charmander',
  types: ['Fire'],
  evolutions: [],
};

const squirtleMock = {
  id: '7',
  number: '007',
  name: 'Squirtle',
  types: ['Water'],
  evolutions: [],
};


jest.mock('@apollo/client', () => ({
  useQuery: jest.fn(),
  gql: jest.fn(),
}));

describe('Result Component', () => {
  beforeEach(() => {
    (useQuery as jest.Mock).mockClear()
  });

  test('renders Bulbasaur with correct type', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { pokemon: bulbasaurMock },
      loading: false,
      error: null,
    });

    render(<Result name="Bulbasaur" setSearch={() => {}} />);
    const typeElement = screen.getByText('Grass, Poison');
    expect(typeElement).toBeInTheDocument();
  });

  test('renders Charmander with correct type', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { pokemon: charmanderMock },
      loading: false,
      error: null,
    });

    render(<Result name="Charmander" setSearch={() => {}} />);
    const typeElement = screen.getByText('Fire');
    expect(typeElement).toBeInTheDocument();
  });

  test('renders Squirtle with correct type', () => {
    (useQuery as jest.Mock).mockReturnValue({
      data: { pokemon: squirtleMock },
      loading: false,
      error: null,
    });

    render(<Result name="Squirtle" setSearch={() => {}} />);
    const typeElement = screen.getByText('Water');
    expect(typeElement).toBeInTheDocument();
  });
});
