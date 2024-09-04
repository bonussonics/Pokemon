"use client";

import { FC, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '../lib/apolloClient';
import Result from './components/Result';

const Page: FC = () => {
  const [search, setSearch] = useState('');

  return (
    <ApolloProvider client={client}>
      <div className="container">
        <header>Pokémon Search</header>
        <input
          className="search-input"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for a Pokémon"
        />
        <Result name={search} setSearch={setSearch} />
      </div>
    </ApolloProvider>
  );
};

export default Page;
