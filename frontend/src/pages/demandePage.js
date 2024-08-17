import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const DemandePage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const [clientMessage, setClientMessage] = useState('');
  const [prestatDate, setPrestatDate] = useState('');
  const [clientAdresse, setClientAdresse] = useState('');
  const [error, setError] = useState(null);
  
  const clientName = `${user.name}  ${user.familyName}`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
        setError('You must be logged in');
        return;
    }

    if (user.role !== 'client') {
        setError('You must be a client');
        return;
    }

    const demandeData = { clientName, id, clientMessage, prestatDate, clientAdresse };

    const response = await fetch('/api/demande', {
        method: 'POST',
        body: JSON.stringify(demandeData),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
        }
    });

    const json = await response.json();

    if (!response.ok) {
        setError(json.error);
    } else {
        console.log('New demande added:', json);
    }
};


  return (
    <form onSubmit={handleSubmit}>
      <h3>Create a New Demande {clientName}</h3>

      <label>Message:</label>
      <input 
        type="text"
        onChange={(e) => setClientMessage(e.target.value)}
        value={clientMessage}
      />

      <label>Date:</label>
      <input 
        type="date"
        onChange={(e) => setPrestatDate(e.target.value)}
        value={prestatDate}
      />

      <label>Adresse: {id}</label>
      <input 
        type="text"
        onChange={(e) => setClientAdresse(e.target.value)}
        value={clientAdresse}
      />

      <button>Add Demande $`{id}` </button>
      
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default DemandePage;
