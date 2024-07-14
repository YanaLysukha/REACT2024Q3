import { useSearchParams } from 'react-router-dom';
import { ICharacter } from '../../services/getCharacters';
import styles from './style.module.css';

interface CharacterProps {
  character: ICharacter;
  handleCharacter: (detailId: string) => Promise<void>;
}

const ListItem: React.FC<CharacterProps> = ({ character, handleCharacter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDetailsChange = async (detailId: string) => {
    setSearchParams({ page: searchParams.get('page') || '1', detailId });
    await handleCharacter(detailId);
  };

  return (
    <div className={styles.wrapper} onClick={async () => await handleDetailsChange(character._id)}>
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
