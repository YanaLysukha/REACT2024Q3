import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListView from '../../components/ListView/ListView';
import { getCharacterById, getCharacters, ICharacter } from '../../services/getCharacters';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './style.module.css';

const TOTAL_PAGES = 10;

const MainPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[] | null>([]);
  const [loader, setLoader] = useState<boolean>(false);
  // const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { pathname } = useLocation();

  const updateSearchValueInLS = (value: string) => {
    localStorage.setItem('value', value);
  };

  const handleCharacter = async (detailId: string) => {
    const character = await getCharacterById(detailId);
    console.log(character);
  };

  const handleCharacters = async (value: string = '') => {
    setLoader(false);
    const trimmedValue = value.trim();
    const characters = await getCharacters(trimmedValue, currentPage);
    if (characters !== null) {
      setCharacters(characters);
    } else {
      setCharacters(null);
    }
    updateSearchValueInLS(trimmedValue);
    setLoader(true);
  };

  useEffect(() => {
    handleCharacters(localStorage.getItem('value') ?? '');
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    navigate(`${pathname}?page=${page}`);
  };

  return (
    <div className={''}>
      <div className={styles.left}>
        <SearchBar
          onSearch={() => handleCharacters(localStorage.getItem('value') ?? '')}
          updateSearchValue={updateSearchValueInLS}
        ></SearchBar>
        {loader ? (
          <>
            <ListView characters={characters ?? []} handleCharacter={handleCharacter}></ListView>
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
      <Outlet></Outlet>
    </div>
  );
};

export default MainPage;
