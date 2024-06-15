import React from 'react';
import styles from '../styles/RequestItem.module.css';

const RequestItem = ({ name, message, date }) => {
  return (
    <div className={styles.requestItem}>
      <div className={styles.avatar}></div>
      <div className={styles.requestInfo}>
        <span>{name}</span>
        <span>{message}</span>
        <span>{date}</span>
      </div>
      <div className={styles.requestActions}>
        <button className={styles.acceptBtn}></button>
        <button className={styles.declineBtn}></button>
      </div>
    </div>
  );
};

export default RequestItem;
