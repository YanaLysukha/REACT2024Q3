import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getAllCharacters, getSearchedCharacters, ICharacter } from '../../getCharacters';
import Loader from '../Loader/Loader';

const Container: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loader, setLoader] = useState<boolean>(false);

  const updateSearchValueInLS = useCallback((value: string) => {
    localStorage.setItem('value', value);
  }, []);

  const handleCharacters = useCallback(
    async (value: string = '') => {
      setLoader(false);
      const trimmedValue = value.trim();
      if (trimmedValue.length === 0) {
        const allCharacters = await getAllCharacters();
        setCharacters(allCharacters);
      } else {
        const searchedCharacters = await getSearchedCharacters(trimmedValue);
        setCharacters(searchedCharacters);
        updateSearchValueInLS(trimmedValue);
      }
      setLoader(true);
    },
    [updateSearchValueInLS],
  );

  useEffect(() => {
    handleCharacters(localStorage.getItem('value') ?? '');
  }, [handleCharacters]);

  return (
    <>
      <SearchBar
        onSearch={() => handleCharacters(localStorage.getItem('value') ?? '')}
        updateSearchValue={updateSearchValueInLS}
      ></SearchBar>
      {loader ? <ListView characters={characters}></ListView> : <Loader></Loader>}
    </>
  );
}

export default Container;