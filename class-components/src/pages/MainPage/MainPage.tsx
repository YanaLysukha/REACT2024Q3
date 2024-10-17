import { useCallback, useEffect, useMemo, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListView from '../../components/ListView/ListView';
import { getCharacters, ICharacter } from '../../services/getCharacters';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useLocation } from 'react-router-dom';
import styles from './style.module.css';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';

const MainPage: React.FC = () => {
  const { getPageValue } = useNavigateMethods();
  const [characters, setCharacters] = useState<ICharacter[] | null>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const { search } = useLocation();
  const currentPage = useMemo(() => getPageValue(), [getPageValue]);

  const updateSearchValueInLS = (value: string) => {
    localStorage.setItem('value', value);
  };

  const fetchData = useCallback(
    async (value: string = '') => {
      try {
        const characters = await getCharacters(value.trim(), currentPage);
        if (characters) {
          setCharacters(characters);
          updateSearchValueInLS(value.trim());
          setLoader(false);
        }
      } catch (error) {
        console.error(error);
        setCharacters(null);
        setLoader(false);
      }
    },
    [getCharacters, currentPage],
  );

  useEffect(() => {
    setLoader(true);
    fetchData(localStorage.getItem('value') ?? '');
  }, [fetchData, search]);

  return (
    <div className={styles.container}>
      <div className={styles.charactersBlock} data-testid="main-component">
        <SearchBar
          onSearch={() => fetchData(localStorage.getItem('value') ?? '')}
          updateSearchValue={updateSearchValueInLS}
        ></SearchBar>
        <div className={styles.listWrapper}>
          {!loader ? (
            <>
              <ListView characters={characters ?? []}></ListView>
              {!search.includes('search') ? <Pagination></Pagination> : <div></div>}
            </>
          ) : (
            <Loader></Loader>
          )}
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
