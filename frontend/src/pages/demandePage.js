import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDemandeContext } from "../hooks/useDemandeContext";
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom'

const DemandePage = () => {
  
  const { dispatch } = useDemandeContext()  
  const { id } = useParams();
  const { user } = useAuthContext();
  const [clientMessage, setClientMessage] = useState('');
  const [prestatDate, setPrestatDate] = useState('');
  const [clientAdresse, setClientAdresse] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([])
  const navigate = useNavigate()
  
  const clientName = `${user.name}  ${user.familyName}`;

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user) {
      setError('Vous devez être connecté.');
      return;
    }
  
    if (user.role !== 'client') {
      setError('Vous devez être un client.');
      return;
    }
  
    const today = new Date();
    const selectedDate = new Date(prestatDate);
  
    if (selectedDate <= today) {
      setError('La date de prestation doit être dans le futur.');
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
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setClientMessage('')
      setPrestatDate('')
      setClientAdresse('')

      console.log('new demande added:', json)
      dispatch({type: 'CREATE_DEMANDE', payload: json})
      navigate('/mesdemandes')
    }
  };

  return (
    <div className='workout-details'>
      
    <form  onSubmit={handleSubmit}>
      <h3>Créer une Nouvelle Demande  {clientName}</h3>

      <label>Message :</label>
      <input 
        type="text"
        onChange={(e) => setClientMessage(e.target.value)}
        value={clientMessage}
        className={emptyFields.includes('clientMessage') ? 'error' : ''}
        
      />

      <label>Date :</label>
      <input 
        type="date"
        onChange={(e) => setPrestatDate(e.target.value)}
        value={prestatDate}
      />

      <label>L'adresse : </label>
      <input 
        type="text"
        onChange={(e) => setClientAdresse(e.target.value)}
        value={clientAdresse}
        className={emptyFields.includes('clientAdresse') ? 'error' : ''}
      />

      <button title="Ajouté" >Ajouté une demande </button>
      
      {error && <div className="error">{error}</div>}
    </form>
    </div>
  );
};

export default DemandePage;
