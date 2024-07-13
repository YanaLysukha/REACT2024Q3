import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getCharacterById, getCharacters, ICharacter } from '../../getCharacters';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Details from '../Details/Details';

// TODO: it shouldn't be a constant!
const TOTAL_PAGES = 10;

const Container: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentDetailId = searchParams.get('detailId');
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter>({} as ICharacter);

  const updateSearchValueInLS = useCallback((value: string) => {
    localStorage.setItem('value', value);
  }, []);

  const handleCharacter = async (detailId: string) => {
    const character = await getCharacterById(detailId);
    setCurrentCharacter(character);
    console.log('character from API ' + character.name);
    console.log('char from state ' + currentCharacter.name);
  };

  const handleCharacters = useCallback(
    async (value: string = '') => {
      setLoader(false);
      const trimmedValue = value.trim();
      const characters = await getCharacters(trimmedValue, currentPage);
      setCharacters(characters);
      updateSearchValueInLS(trimmedValue);
      setLoader(true);
    },
    [updateSearchValueInLS, currentPage],
  );

  useEffect(() => {
    handleCharacters(localStorage.getItem('value') ?? '');
  }, [handleCharacters]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      if (currentDetailId !== null) {
        setSearchParams({ page: page.toString(), detailId: currentDetailId });
      } else {
        setSearchParams({ page: page.toString() });
      }
    }
  };

  return (
    <>
      <div id="main">
        <SearchBar
          onSearch={() => handleCharacters(localStorage.getItem('value') ?? '')}
          updateSearchValue={updateSearchValueInLS}
        ></SearchBar>
        {loader ? (
          <>
            <ListView characters={characters} handleCharacter={handleCharacter}></ListView>
            <Pagination
              currentPage={currentPage}
              totalPages={TOTAL_PAGES}
              onPageChange={handlePageChange}
            ></Pagination>
          </>
        ) : (
          <Loader></Loader>
        )}
      </div>
      {Object.keys(currentCharacter).length > 0 && <Details character={currentCharacter} />}
    </>
  );
};

export default Container;
