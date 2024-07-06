import { Component, ReactNode } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ListView from '../ListView/ListView';
import { ICharacter } from '../../getCharacters';

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

  render(): ReactNode {
    return (
      <>
        <SearchBar></SearchBar>
        <ListView></ListView>
      </>
    );
  }
}
