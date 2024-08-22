import { useNavigate } from 'react-router-dom';
import { ICharacter } from '../../services/getCharacters';
import styles from './style.module.css';

interface CharacterProps {
  character: ICharacter;
}

const ListItem: React.FC<CharacterProps> = ({ character }) => {
  const navigate = useNavigate();
  const handleCharacterClick = () => {
    navigate(`/${character._id}`);
  };

  return (
    <div className={styles.wrapper} onClick={handleCharacterClick}>
      <h1 className={styles.title}>{character.name}</h1>
      <p>Race: {character.race}</p>
      <p>Gender: {character.gender}</p>
      <p>Spouse: {character.spouse}</p>
      <p>Birth: {character.birth}</p>
      <p>Death: {character.death}</p>
    </div>
  );
};

export default ListItem;
