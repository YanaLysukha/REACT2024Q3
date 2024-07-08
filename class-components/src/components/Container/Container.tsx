import { Component, ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getAllCharacters, getSearchedCharacters, ICharacter } from '../../getCharacters';
import Loader from '../Loader/Loader';

interface IState {
  characters: ICharacter[];
  isLoaded: boolean;
}

export default class Container extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: [],
      isLoaded: false,
    };
  }

  componentDidMount = async () => {
    const value = localStorage.getItem('value');
    if (value) {
      this.handleCharacters(value);
    } else {
      this.handleCharacters();
    }
  };

  updateSearchValueInLS = (value: string) => {
    localStorage.setItem('value', value);
  };

  handleCharacters = async (value: string = '') => {
    this.setState({ isLoaded: false });
    const trimmedValue = value.trim();
    if (trimmedValue.length === 0) {
      const allCharacters = await getAllCharacters();
      this.setState({ characters: allCharacters, isLoaded: true });
    } else {
      const searchedCharacters = await getSearchedCharacters(trimmedValue);
      this.setState({ characters: searchedCharacters, isLoaded: true });
      this.updateSearchValueInLS(trimmedValue);
    }
  };

  render(): ReactNode {
    const { characters, isLoaded } = this.state;
    return (
      <>
        <SearchBar
          onSearch={() => this.handleCharacters(localStorage.getItem('value') ?? '')}
          updateSearchValue={this.updateSearchValueInLS}
        ></SearchBar>
        {isLoaded ? <ListView characters={characters}></ListView> : <Loader></Loader>}
      </>
    );
  }
}
