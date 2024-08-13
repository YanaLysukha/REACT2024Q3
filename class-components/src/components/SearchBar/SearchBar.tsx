import { ChangeEvent, useEffect, useState } from 'react';
import logoIcon from '../../assets/images/LOTR-icon.svg';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';

interface ISearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
  updateSearchValue: (value: string) => void;
}

const SearchBar: React.FC<ISearchBarProps> = ({ onSearch, updateSearchValue }) => {
  const [searchValue, setSearchValue] = useState<string>(
    () => localStorage.getItem('value') ?? '',
  );
  const navigate = useNavigate();

  useEffect(() => {
    updateSearchValue(searchValue);
  }, [searchValue, updateSearchValue]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(searchValue);
    navigate(`/?page=1${searchValue && '&search=' + searchValue}`);
  };

  return (
    <>
      <img src={logoIcon} className={styles.logo}></img>
      <div className={styles.container}>
        <form aria-label='form' className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.wrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Find your favorite character..."
              defaultValue={searchValue.trim()}
              onChange={handleChange}
            ></input>
          </div>
          <button className={styles.btn}>Search</button>
        </form>
      </div>
    </>
  );
};

export default SearchBar;
