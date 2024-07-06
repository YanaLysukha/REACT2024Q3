import { ChangeEvent, Component, ReactNode } from 'react';
import logoIcon from '../../assets/images/LOTR-icon.svg';
import styles from './style.module.css';

interface ISearchBarProps {
  onSearch: (searchValue: string) => Promise<void>;
  updateSearchValue: (value: string) => void;
}

interface IState {
  error: boolean;
}

export default class SearchBar extends Component<ISearchBarProps, IState> {
  constructor(props: ISearchBarProps) {
    super(props);
    this.state = {
      error: false
    };
  }
  
  handleClick = () => {
    this.setState({ error: true });
  }

  componentDidUpdate = () => {
    if (this.state.error) {
      throw new Error('Oops, something went wrong!');
    }
  }

  handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { updateSearchValue } = this.props;
    updateSearchValue(event.target.value);
  };

  render(): ReactNode {
    const searchValue = localStorage.getItem('value') ?? '';
    console.log(searchValue);
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
                onChange={this.handleChange}
              ></input>
            </div>
            <button className={styles.btn} onClick={() => this.props.onSearch(searchValue)}>
              Search
            </button>
          </div>
          <button className={styles.btn} onClick={this.handleClick}>Get an error!</button>
        </div>
      </>
    );
  }
}
