import { Component, ReactNode } from 'react';
import { ICharacter } from '../../getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

interface ListViewProps {
  characters: ICharacter[];
}

export default class ListView extends Component<ListViewProps> {
  render(): ReactNode {
    const { characters } = this.props;
    return (
      <div className={styles.container}>
        {characters.map((character) => (
          <ListItem character={character} key={character._id}></ListItem>
        ))}
      </div>
    );
  }
}
