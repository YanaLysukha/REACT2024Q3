import { Component, ReactNode } from 'react';
import styles from './style.module.css';
import loaderIcon from '../../assets/images/ring-inscription.png';

export default class Loader extends Component {
  render(): ReactNode {
    return <img className={styles.loader} src={loaderIcon}></img>;
  }
}
