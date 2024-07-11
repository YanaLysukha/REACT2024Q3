import styles from './style.module.css';
import loaderIcon from '../../assets/images/ring-inscription.png';

export default function Loader() {
  return (
    <img className={styles.loader} src={loaderIcon}></img>
  )
}
