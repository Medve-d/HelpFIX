import { usePrestationsContext } from '../hooks/usePrestationsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale'; 

const PrestationDetails = ({ prestation }) => {
  const { dispatch } = usePrestationsContext();
  const { user, role } = useAuthContext();
  const navigate = useNavigate();


  const handleClickdelete = async () => {
    
    if (!user) {
      return;
    }
    
    const response = await fetch('/api/prestation/' + prestation._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRESTATION', payload: json });
    }
  };
  const handleClickview = () => {
    navigate(`/prestation/${prestation._id}`);
  };
  

  return (
    <div className="workout-details">
      <h4>{prestation.ville}</h4>
      <p><strong>{prestation.title}</strong></p>
      <p><strong>Job   : </strong> {prestation.job}</p>
      <p><strong>Nom   : </strong> {prestation.userName}</p>
      <p><strong>Prix   : </strong> {prestation.price}€</p>
      <p><strong>Description   : </strong> {prestation.description}</p>
      <p>{formatDistanceToNow(new Date(prestation.createdAt), { addSuffix: true, locale: fr })}</p>
      {role === 'prestataire' && (
        <span className="material-symbols-outlined" onClick={handleClickdelete} title='Supprimer'>delete</span>
      )}
      {role === 'client' && (
        <span className="material-symbols-outlined" onClick={handleClickview} title='ouvrir'>add</span>
      )}

    </div>
  );
};

export default PrestationDetails;
