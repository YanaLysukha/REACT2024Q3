import { useSearchParams } from 'react-router-dom';
import { ICharacter } from '../../getCharacters';
import styles from './style.module.css';

interface CharacterProps {
  character: ICharacter;
}

const ListItem: React.FC<CharacterProps> = ({ character }) => {
  // TODO: research about updateSearchParams
  const [searchParams, setSearchParams] = useSearchParams();
  const handleDetailsChange = (detailId: string) => {
    console.log(searchParams);
    setSearchParams({ page: searchParams.get('page') || '1',  detailId });
  };

  return (
    <div className={styles.wrapper} onClick={() => handleDetailsChange(character._id)}>
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
