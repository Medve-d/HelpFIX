import React from 'react';
import RequestList from '../components/RequestList';
import Navbar from '@/src/components/Navbar';

const ListRequest = () => {
  return (
    
    <div className="listePrestation">
    <Navbar />
      <RequestList />
    </div>
  );
};

export default ListRequest;
