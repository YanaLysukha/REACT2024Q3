import { ICharacter } from '../../getCharacters';
import styles from './style.module.css';

interface ICharacterProps {
  character: ICharacter;
  handleCharacterDeletion: () => void;
}

const Details: React.FC<ICharacterProps> = ({ character, handleCharacterDeletion }) => {
  return (
    <>
      <div className={styles.container}>
        <button className={styles.button} onClick={handleCharacterDeletion}>Close</button>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>{character.name}</h2>
          <p>Race: {character.race}</p>
          <p>Gender: {character.gender}</p>
          <p>Spouse: {character.spouse}</p>
          <p>Birth: {character.birth}</p>
          <p>Death: {character.death}</p>
        </div>
      </div>
    </>
  );
};

export default Details;
