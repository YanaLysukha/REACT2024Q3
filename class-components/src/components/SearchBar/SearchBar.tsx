import { Component, ReactNode } from 'react';
import styles from './style.module.css';

export default class SearchBar extends Component {
  render(): ReactNode {
    return (
      <div className={styles.container}>
        <form className={styles.form}>
          <div className={styles.wrapper}>
            <input
              type="text"
              className={styles.input}
              placeholder="Find your favorite character..."
            ></input>
          </div>
          <button className={styles.btn}>Search</button>
        </form>
      </div>
    );
  }
}
