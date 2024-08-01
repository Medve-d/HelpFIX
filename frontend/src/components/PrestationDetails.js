import { usePrestationsContext } from '../hooks/usePrestationsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale'; 

const PrestationDetails = ({ prestation }) => {
  const { dispatch } = usePrestationsContext();

  const handleClick = async () => {
    const response = await fetch('/api/prestation/' + prestation._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRESTATION', payload: json });
    }
  };

  return (
    <div className="workout-details">
      <h4>{prestation.ville}</h4>
      <p><strong>Job  : </strong>{prestation.job}</p>
      <p><strong>Description  : </strong>{prestation.description}</p>
      <p>{formatDistanceToNow(new Date(prestation.createdAt), { addSuffix: true, locale: fr })}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
    </div>
  );
};

export default PrestationDetails;
