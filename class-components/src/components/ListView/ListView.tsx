import { Component, ReactNode } from 'react';
import { getAllCharacters } from '../../getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

const characters = await getAllCharacters();

export default class ListView extends Component {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        {characters.map((character) => (
          <ListItem character={character} key={character._id}></ListItem>
        ))}
      </div>
    );
  }
}
