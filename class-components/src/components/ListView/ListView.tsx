import { ICharacter } from '../../getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

interface ListViewProps {
  characters: ICharacter[];
}

const ListView: React.FC<ListViewProps> = ({ characters }) => {

  return (
    <div className={styles.container}>
      {characters.map((character) => (
        <ListItem character={character} key={character._id}></ListItem>
      ))}
    </div>
  );
};

export default ListView;
