import React from 'react';
import RequestItem from './RequestItem';
import styles from '../styles/RequestList.module.css';

const requests = [
  { name: "Paul",date: "12/12/2025" , message: "Réparer machine à laver" },
  //Pour back-end select les infos ici 
];

const RequestList = () => {
  return (
    <div className={styles.requestList}>
      <h2>Liste des prestations demandées</h2>
      {requests.map((request, index) => (
        <RequestItem
          key={index}
          name={request.name}
          date={request.date}
          message={request.message}
        />
      ))}
    </div>
  );
};

export default RequestList;
