import { useCallback, useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListView from '../../components/ListView/ListView';
import { getCharacters, ICharacter } from '../../services/getCharacters';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const TOTAL_PAGES = 10;

const MainPage: React.FC = () => {
  // const { getPageValue } = useNavigateMethods();
  const [characters, setCharacters] = useState<ICharacter[] | null>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname, search } = useLocation();
  // const currentPage = useMemo(() => getPageValue(), [getPageValue]);

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`${pathname}?page=${page}`);
  };

  return (
    <div className={''}>
      <div className={styles.left}>
        <SearchBar
          onSearch={() => fetchData(localStorage.getItem('value') ?? '')}
          updateSearchValue={updateSearchValueInLS}
        ></SearchBar>
        <div className={styles.listwrapper}>
          {!loader ? (
            <>
              <ListView characters={characters ?? []}></ListView>
              {!search.includes('search') ? (
                <Pagination
                  currentPage={currentPage}
                  totalPages={TOTAL_PAGES}
                  onPageChange={handlePageChange}
                ></Pagination>
              ) : (
                <div></div>
              )}
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
