import styles from './style.module.css';
import loaderIcon from '../../assets/images/ring-inscription.png';

const Loader = () => {
  return <img className={styles.loader} src={loaderIcon} alt="loader image"></img>;
};

export default Loader;
