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
            this.handleSearchCharacters(value);
        } else {
            this.fetchCharacters();
        }
  };

  updateSearchValueInLS = (value: string) => {
    localStorage.setItem('value', value);
  };

  handleSearchCharacters = async (value: string) => {
    this.setState({ isLoaded: false });
    const searchedCharacters = await getSearchedCharacters(value);
    this.setState({ characters: searchedCharacters, isLoaded: true });
    this.updateSearchValueInLS(value);
  };

  fetchCharacters = async () => {
    this.setState({ isLoaded: false });
    const allCharacters = await getAllCharacters();
    this.setState({ characters: allCharacters, isLoaded: true });
  };

  render(): ReactNode {
    const { characters, isLoaded } = this.state;
    return (
      <>
        <SearchBar
          onSearch={() => this.handleSearchCharacters(localStorage.getItem('value') ?? '')}
          updateSearchValue={this.updateSearchValueInLS}
        ></SearchBar>
        {isLoaded ? <ListView characters={characters}></ListView> : <Loader></Loader>}
      </>
    );
  }
}
