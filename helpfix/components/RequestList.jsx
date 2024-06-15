import React from 'react';
import RequestItem from './RequestItem';
import styles from '../styles/RequestList.module.css';

const requests = [
  { name: "Paul", message: "Réparer machine à laver", date: "12/12/2025" },
  //Pour back-end select les infos ici 
];

const RequestList = () => {
  return (
    <div className={styles.requestList}>
      <h2>En Attente</h2>
      {requests.map((request, index) => (
        <RequestItem
          key={index}
          name={request.name}
          message={request.message}
          date={request.date}
        />
      ))}
    </div>
  );
};

export default RequestList;
