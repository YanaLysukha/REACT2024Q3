import { useEffect, useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import ListView from '../../components/ListView/ListView';
import { getCharacterById, getCharacters, ICharacter } from '../../services/getCharacters';
import Loader from '../../components/Loader/Loader';
import Pagination from '../../components/Pagination/Pagination';
import { useSearchParams } from 'react-router-dom';
import Details from '../../components/Details/Details';
import styles from './style.module.css';

const TOTAL_PAGES = 10;

const MainPage: React.FC = () => {
  const [characters, setCharacters] = useState<ICharacter[] | null>([]);
  const [loader, setLoader] = useState<boolean>(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const currentDetailId = searchParams.get('detailId');
  const [currentCharacter, setCurrentCharacter] = useState<ICharacter>({} as ICharacter);

  const updateSearchValueInLS = (value: string) => {
    localStorage.setItem('value', value);
  };

  const handleCharacter = async (detailId: string) => {
    const character = await getCharacterById(detailId);
    setCurrentCharacter(character);
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
  }, [searchParams]);
  // add current page later

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= TOTAL_PAGES) {
      if (currentDetailId !== null) {
        setSearchParams({ page: page.toString(), detailId: currentDetailId });
      } else {
        setSearchParams({ page: page.toString() });
      }
    }
  };

  const handleCharacterDeletion = () => {
    setCurrentCharacter({} as ICharacter);
  };

  return (
    <div className={currentCharacter ? styles.split : ''}>
      <div className={styles.left} onClick={handleCharacterDeletion}>
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
      {Object.keys(currentCharacter).length > 0 && (
        <div className={styles.right}>
          <Details
            character={currentCharacter}
            handleCharacterDeletion={handleCharacterDeletion}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
