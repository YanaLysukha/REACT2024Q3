import { ICharacter } from '../../getCharacters';
import styles from './style.module.css';

interface CharacterProps {
  character: ICharacter;
}

const ListItem: React.FC<CharacterProps> = ({ character }) => {
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

export default ListItem;
