import React from 'react';
import styles from '../styles/documentItem.module.css';

const DocumentItem = ({ title }) => {
  return (
    <div className={styles.documentItem}>
      <span>{title}</span>
      <div className={styles.actions}>
        <button className={styles.upload}>Upload</button>
        <button className={styles.complete}>Complete</button>
      </div>
    </div>
  );
};

export default DocumentItem;
