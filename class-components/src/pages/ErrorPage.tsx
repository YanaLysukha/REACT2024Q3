import { useRouteError } from "react-router-dom";
import styles from './style.module.css';

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);
  
    return (
      <div className={styles.background}>
        <div className={styles.wrapper}>
          <h1 className={styles.title}>
              404: The Page Has Fallen into Shadow
          </h1>
          <h2 className={styles.greetings}>Greetings, Traveler.</h2>
          <p className={styles.text}>It appears the page you seek has been lost in the depths of Mordor, or perhaps it was never here to begin with.</p>
        </div>
      </div>
    );
}