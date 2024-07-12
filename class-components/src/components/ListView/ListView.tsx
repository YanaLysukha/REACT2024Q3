import { Link } from 'react-router-dom';
import { ICharacter } from '../../getCharacters';
import ListItem from '../ListItem/ListItem';
import styles from './style.module.css';

interface ListViewProps {
  characters: ICharacter[];
}

const ListView: React.FC<ListViewProps> = ({ characters }) => {
  return (
    <div className={styles.container}>
      {characters.map((character, i) => (
        <Link to={`details/${i + 1}`} key={character._id}>
          <ListItem character={character} key={character._id}></ListItem>
        </Link>
      ))}
    </div>
  );
};

export default ListView;
