import React from 'react';
import styles from './BoxLoader.module.css'; // Import the CSS module

const BoxLoader = () => {
  return (
    <div className={styles['box-loader-container']}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default BoxLoader;
