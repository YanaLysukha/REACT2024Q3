import { ICharacter } from '../../services/getCharacters';
import styles from './style.module.css';
import { useNavigateMethods } from '../../hooks/useNavigateMethods';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { ThemeContext } from '../../context/themeProvider';

interface CharacterProps {
  character: ICharacter;
}

const ListItem: React.FC<CharacterProps> = ({ character }) => {
  const navigate = useNavigate();
  const { getPageValue, createSearchParams } = useNavigateMethods();
  const handleCharacterClick = () => {
    navigate(`/item/${character._id}?${createSearchParams(getPageValue())}`);
  };
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeSwitcherBtn must be used within a ThemeProvider');
  }
  const { darkTheme } = context;

  return (
    <div
      className={`${styles.wrapper} ${darkTheme ? styles.dark : styles.light}`}
      onClick={handleCharacterClick}
      data-testid="result-item"
    >
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
