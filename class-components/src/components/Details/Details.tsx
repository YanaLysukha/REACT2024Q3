import { useEffect, useState } from 'react';
import { getCharacterById, ICharacter } from '../../services/getCharacters';
import styles from './style.module.css';
import { useNavigate, useParams } from 'react-router-dom';

const Details = () => {
  const [character, setCharacter] = useState<ICharacter | null>(null);
  const { itemId } = useParams<{ itemId: string }>();
  const navigate = useNavigate();

  const getCharacterDetails = async () => {
    try {
      if (itemId) {
        const characterData = await getCharacterById(itemId);
        setCharacter(characterData);
      }
    } catch (error) {
      console.error(error);
      setCharacter(null);
    }
  };

  const handleClose = () => {
    navigate('/');
  }

  useEffect(() => {
    getCharacterDetails();
  }, [itemId]);

  return (
    <div className={styles.detailsWrapper}>
      <div className={styles.container}>
      <button className={styles.button} onClick={handleClose}>
        Close
      </button>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>{character?.name}</h2>
        <p>Race: {character?.race}</p>
        <p>Gender: {character?.gender}</p>
        <p>Spouse: {character?.spouse}</p>
        <p>Birth: {character?.birth}</p>
        <p>Death: {character?.death}</p>
      </div>
    </div>
    </div>
  );
};

export default Details;
