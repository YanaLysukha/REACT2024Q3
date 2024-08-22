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
  };

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
          <p>
            <span className={styles.highlighted}>Race:</span> {character?.race}
          </p>
          <p>
            <span className={styles.highlighted}>Gender:</span> {character?.gender}
          </p>
          <p>
            <span className={styles.highlighted}>Spouse:</span> {character?.spouse}
          </p>
          <p>
            <span className={styles.highlighted}>Birth:</span> {character?.birth}
          </p>
          <p>
            <span className={styles.highlighted}>Death:</span> {character?.death}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Details;
