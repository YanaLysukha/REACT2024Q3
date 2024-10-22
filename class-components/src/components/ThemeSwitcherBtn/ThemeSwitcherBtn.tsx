import { useContext } from 'react';
import { ThemeContext } from '../../context/themeProvider';
import styles from './style.module.css';

export const ThemeSwitcherBtn = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ThemeSwitcherBtn must be used within a ThemeProvider');
  }
  const { darkTheme, toggleTheme } = context;
  return (
    <button onClick={toggleTheme} className={`${styles.btn} ${darkTheme ? styles.light : styles.dark}`}>
      Change theme
    </button>
  );
};
