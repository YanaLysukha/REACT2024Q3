import { Component, ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getAllCharacters, getSearchedCharacters, ICharacter } from '../../getCharacters';

interface IState {
  characters: ICharacter[];
  searchValue: string;
}

export default class Container extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: [],
      searchValue: '',
    };
  }

  componentDidMount = async () => {
    this.fetchCharacters();
  };

  updateSearchValueInLS = (value: string) => {
    localStorage.setItem('name', value);
  };

  updateSearchValue = (value: string) => {
    this.setState({ searchValue: value });
  };

  handleSearchCharacters = async (value: string) => {
    // this.updateSearchValueInLS(searchValue);
    this.setState({ searchValue: value });
    const searchedCharacters = await getSearchedCharacters(value);
    this.setState({ characters: searchedCharacters });
  };

  fetchCharacters = async () => {
    const allCharacters = await getAllCharacters();
    this.setState({ characters: allCharacters });
  };

  render(): ReactNode {
    const { characters, searchValue } = this.state;
    return (
      <>
        <SearchBar
          onSearch={() => this.handleSearchCharacters(searchValue)}
          searchValue={searchValue}
          updateSearchValue={this.updateSearchValue}
        ></SearchBar>
        <ListView characters={characters}></ListView>
      </>
    );
  }
}
