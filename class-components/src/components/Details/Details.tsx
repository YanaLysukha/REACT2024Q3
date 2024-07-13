import { ICharacter } from "../../getCharacters";
import styles from './style.module.css';

interface ICharacterProps {
  character: ICharacter;
}

const Details: React.FC<ICharacterProps> = ({ character }) => {
  console.log("rerender");
  return (
    <>
      <div className={styles.container}>
        <button className={styles.button}>close</button>
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
  )
};

export default Details;
