import { useRouter } from 'next/router';
import { FC, ChangeEvent, useEffect, useState } from 'react';

const SearchInput: FC = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>(router.query.name as string || '');


  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    router.push({
      pathname: '/',
      query: { name: newQuery },
    });
  };


  useEffect(() => {
    if (router.query.name) {
      setQuery(router.query.name as string);
    }
  }, [router.query.name]);

  return (
    <input
      type="text"
      placeholder="Search Pokémon"
      value={query}
      onChange={handleChange}
    />
  );
};

export default SearchInput;
