import { Component, ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getAllCharacters, getSearchedCharacters, ICharacter } from '../../getCharacters';
import Loader from '../Loader/Loader';

interface IState {
  characters: ICharacter[];
  searchValue: string;
  isLoaded: boolean;
}

export default class Container extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: [],
      searchValue: '',
      isLoaded: false,
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
    this.setState({ searchValue: value, isLoaded: false });
    const searchedCharacters = await getSearchedCharacters(value);
    this.setState({ characters: searchedCharacters, isLoaded: true });
  };

  fetchCharacters = async () => {
    this.setState({ isLoaded: false });
    const allCharacters = await getAllCharacters();
    this.setState({ characters: allCharacters, isLoaded: true });
  };

  render(): ReactNode {
    const { characters, searchValue, isLoaded } = this.state;
    return (
      <>
        <SearchBar
          onSearch={() => this.handleSearchCharacters(searchValue)}
          searchValue={searchValue}
          updateSearchValue={this.updateSearchValue}
        ></SearchBar>
        {isLoaded ? (<ListView characters={characters}></ListView>) : (<Loader></Loader>)}
      </>
    );
  }
}
