import { ICharacter } from '../../getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

interface ListViewProps {
  characters: ICharacter[];
  handleCharacter: (detailId: string) => Promise<void>;
}

const ListView: React.FC<ListViewProps> = ({ characters, handleCharacter }) => {
  return (
    <div className={styles.container}>
      {characters.map((character) => (
        <ListItem character={character} key={character._id} handleCharacter={handleCharacter}></ListItem>
      ))}
    </div>
  );
};

export default ListView;
