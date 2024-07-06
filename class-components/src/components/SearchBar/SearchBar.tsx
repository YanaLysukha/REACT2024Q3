import { ChangeEvent, Component, ReactNode } from 'react';
import logoIcon from '../../assets/images/LOTR-icon.svg';
import styles from './style.module.css';

interface ISearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
  searchValue: string;
  updateSearchValue: (value: string) => void;
}

export default class SearchBar extends Component<ISearchBarProps> {
  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { updateSearchValue } = this.props;
    updateSearchValue(event.target.value);
  };

  render(): ReactNode {
    const { searchValue } = this.props;
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
                value={searchValue}
                onChange={this.handleChange}
              ></input>
            </div>
            <button className={styles.btn} onClick={() => this.props.onSearch(searchValue)}>
              Search
            </button>
          </div>
        </div>
      </>
    );
  }
}
