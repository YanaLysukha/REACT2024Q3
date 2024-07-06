import { Component, ErrorInfo, ReactNode } from 'react';
import styles from './style.module.css';

interface IState {
  error: boolean;
}

interface IProps {
  children?: ReactNode;
}

export default class ErrorBoundary extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { error: false };
  }

  static getDerivedStateFromError(): IState {
    return { error: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.error) {
        return <h1 className={styles.title}>Something went wrong...</h1>;
    }
    return this.props.children;
  }
}
