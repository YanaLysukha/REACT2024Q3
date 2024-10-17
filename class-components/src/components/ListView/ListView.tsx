import { ICharacter } from '../../services/getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

interface ListViewProps {
  characters: ICharacter[];
}

const ListView: React.FC<ListViewProps> = ({ characters }) => {
  if (characters.length === 0) {
    return (
      <p className={styles.text}>
        Our story has hit a small snag, and the characters you seek are momentarily out of reach...
      </p>
    );
  }

  return (
    <div role="view" className={styles.container}>
      {characters.map((character) => (
        <ListItem character={character} key={character._id}></ListItem>
      ))}
    </div>
  );
};

export default ListView;
