import { ChangeEvent, useEffect, useState } from 'react';
import logoIcon from '../../assets/images/LOTR-icon.svg';
import styles from './style.module.css';

interface ISearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
  updateSearchValue: (value: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch, updateSearchValue }) => {
  const [searchValue, setSearchValue] = useState<string>(
    () => localStorage.getItem('value') ?? '',
  );

  useEffect(() => {
    updateSearchValue(searchValue);
  }, [searchValue, updateSearchValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = () => {
    onSearch(searchValue);
  };

  return (
    <>
      <img src={logoIcon} className={styles.logo}></img>
      <div className={styles.container}>
        <div className={styles.form}>
          <div className={styles.wrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Find your favorite character..."
              defaultValue={searchValue.trim()}
              onChange={handleChange}
            ></input>
          </div>
          <button className={styles.btn} onClick={handleSearch}>
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchBar;
