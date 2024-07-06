import { Component, ReactNode } from 'react';
import styles from '../SearchBar/style.module.css';

interface IState {
  error: boolean;
}

export default class ErrorButton extends Component {
  state: IState = { error: false };

  handleClick = () => {
    this.setState({ error: true });
  };

  componentDidUpdate = () => {
    if (this.state.error) {
      throw new Error('Oops, something went wrong!');
    }
  };

  render(): ReactNode {
    return (
      <button className={styles.btn} onClick={this.handleClick}>
        Get an error!
      </button>
    );
  }
}
