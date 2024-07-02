import React from 'react';
import styles from '../styles/RequestItem.module.css';

const RequestItem = ({ name, date,message  }) => {
  return (
    <div className={styles.requestItem}>
      <div className={styles.avatar}></div>
      <div className={styles.requestInfo}>
        <span>{name}</span>
        <span>{date}</span>
        <span>{message}</span>
      </div>
      <div className={styles.requestActions}>
        <button className={styles.acceptBtn}>Accepter</button>
        <button className={styles.declineBtn}>Refuser</button>
      </div>
    </div>
  );
};

export default RequestItem;
