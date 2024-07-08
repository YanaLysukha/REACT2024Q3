import { Component, ReactNode } from 'react';
import { ICharacter } from '../../getCharacters';
import styles from './style.module.css';

interface CharacterProps {
  character: ICharacter;
}

export default class ListItem extends Component<CharacterProps> {
  render(): ReactNode {
    const { character } = this.props;

    return (
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{character.name}</h1>
        <p>Race: {character.race}</p>
        <p>Gender: {character.gender}</p>
        <p>Spouse: {character.spouse}</p>
        <p>Birth: {character.birth}</p>
        <p>Death: {character.death}</p>
      </div>
    );
  }
}
