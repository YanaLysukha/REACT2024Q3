import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getCharacters, ICharacter } from '../../getCharacters';
import Loader from '../Loader/Loader';
import Pagination from '../Pagination/Pagination';

const TOTAL_PAGES = 10;

const Container: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[]>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const updateSearchValueInLS = useCallback((value: string) => {
    localStorage.setItem('value', value);
  }, []);

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
      setCurrentPage(page);
    }
  };

  return (
    <>
      <SearchBar
        onSearch={() => handleCharacters(localStorage.getItem('value') ?? '')}
        updateSearchValue={updateSearchValueInLS}
      ></SearchBar>
      {loader ? (
        <>
          <ListView characters={characters}></ListView>
          <Pagination
            currentPage={currentPage}
            totalPages={TOTAL_PAGES}
            onPageChange={handlePageChange}
          ></Pagination>
        </>
      ) : (
        <Loader></Loader>
      )}
    </>
  );
};

export default Container;
