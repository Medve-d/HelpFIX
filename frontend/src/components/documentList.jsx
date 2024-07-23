import React from 'react';
import DocumentItem from './DocumentItem';
import styles from '../styles/documentList.module.css';

const documents = [
  "Document à transmettre :",
  "Document à transmettre :",
  "Document à transmettre :",
  "Document à transmettre :",
];

const DocumentList = () => {
  return (
    <div className={styles.documentList}>
      <h2>Merci de m'envoyer les documents suivants</h2>
      {documents.map((doc, index) => (
        <DocumentItem key={index} title={doc} />
      ))}
    </div>
  );
};

export default DocumentList;
