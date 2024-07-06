import { Component, ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { getAllCharacters, ICharacter } from '../../getCharacters';

interface IState {
  characters: ICharacter[];
}

export default class Container extends Component<Record<string, never>, IState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  async componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = async () => {
    const allCharacters = await getAllCharacters();
    this.setState({ characters: allCharacters });
  };

  render(): ReactNode {
    const { characters } = this.state;
    return (
      <>
        <SearchBar></SearchBar>
        <ListView characters={characters}></ListView>
      </>
    );
  }
}
