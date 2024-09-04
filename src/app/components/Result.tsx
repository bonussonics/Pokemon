import { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/navigation'; 


interface Attack {
  name: string;
  type: string;
  damage: number;
}

interface Evolution {
  id: string;
  name: string;
  image: string;
}

interface Weight {
  minimum: string;
  maximum: string;
}

interface Height {
  minimum: string;
  maximum: string;
}

interface Pokemon {
  id: string;
  number: string;
  name: string;
  weight: Weight;
  height: Height;
  classification: string;
  types: string[];
  resistant: string[];
  weaknesses: string[];
  fleeRate: number;
  maxCP: number;
  maxHP: number;
  image: string;
  attacks: {
    fast: Attack[];
    special: Attack[];
  };
  evolutions?: Evolution[];
}

const GET_POKEMON = gql`
  query GetPokemon($name: String!) {
    pokemon(name: $name) {
      id
      number
      name
      weight {
        minimum
        maximum
      }
      height {
        minimum
        maximum
      }
      classification
      types
      resistant
      weaknesses
      fleeRate
      maxCP
      maxHP
      image
      attacks {
        fast {
          name
          type
          damage
        }
        special {
          name
          type
          damage
        }
      }
      evolutions {
        id
        name
        image
      }
    }
  }
`;

interface ResultProps {
  name: string;
  setSearch: (name: string) => void;
}

const Result: FC<ResultProps> = ({ name, setSearch }) => {
  const { data, loading, error } = useQuery<{ pokemon: Pokemon }>(GET_POKEMON, {
    variables: { name },
    skip: !name,
  });

  const router = useRouter();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const pokemon = data?.pokemon;

  if (!pokemon) return <p>No Pokémon found.</p>;

  return (
    <div>
      <h1>{pokemon.name} (#{pokemon.number})</h1>
      <img src={pokemon.image} alt={pokemon.name} />
      <p>Weight: {pokemon.weight.minimum} - {pokemon.weight.maximum}</p>
      <p>Height: {pokemon.height.minimum} - {pokemon.height.maximum}</p>
      <p>Classification: {pokemon.classification}</p>
      <p>Types: {pokemon.types.join(', ')}</p>
      <p>Resistant: {pokemon.resistant.join(', ')}</p>
      <p>Weaknesses: {pokemon.weaknesses.join(', ')}</p>
      <p>Flee Rate: {pokemon.fleeRate}</p>
      <p>Max CP: {pokemon.maxCP}</p>
      <p>Max HP: {pokemon.maxHP}</p>
      <h2>Fast Attacks</h2>
      <ul>
        {pokemon.attacks.fast.map((attack) => (
          <li key={attack.name}>
            {attack.name} ({attack.type}): {attack.damage} damage
          </li>
        ))}
      </ul>
      <h2>Special Attacks</h2>
      <ul>
        {pokemon.attacks.special.map((attack) => (
          <li key={attack.name}>
            {attack.name} ({attack.type}): {attack.damage} damage
          </li>
        ))}
      </ul>
      <h2>Evolutions</h2>
      {pokemon.evolutions && pokemon.evolutions.length > 0 ? (
        <ul>
          {pokemon.evolutions.map((evolution) => (
            <li key={evolution.id}>
              <img src={evolution.image} alt={evolution.name} />
              <button onClick={() => {
                setSearch(evolution.name);
                router.push(`/?name=${evolution.name}`);
              }}>
                {evolution.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>This Pokémon has no evolutions.</p>
      )}
    </div>
  );
};

export default Result;
