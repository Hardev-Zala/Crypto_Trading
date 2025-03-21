import React from "react";
import styles from "./StartingLoader.module.css";

function StartingLoader() {
  return (
    <>
      <div className={styles.fullScreenLoader}>
        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <circle r="32" cy="40" cx="40"></circle>
          </svg>
        </div>

        <div className={`${styles.loader} ${styles.triangle}`}>
          <svg viewBox="0 0 86 80">
            <polygon points="43 8 79 72 7 72"></polygon>
          </svg>
        </div>

        <div className={styles.loader}>
          <svg viewBox="0 0 80 80">
            <rect height="64" width="64" y="8" x="8"></rect>
          </svg>
        </div>
      </div>
    </>
  );
}

export default StartingLoader;
