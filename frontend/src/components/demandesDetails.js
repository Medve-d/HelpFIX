import { useDemandeContext } from '../hooks/useDemandeContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';


const DemandesDetails = ({ demande }) => {
  const { user, role } = useAuthContext();

  

  return (
    <div className="workout-details">
      <p><strong>Title   : </strong> {demande.title}</p>
      <p><strong>client Nom   : </strong> {demande.clientName}</p>
      <p><strong>Message de client   : </strong> {demande.clientMessage}</p>
      <p><strong>l'adresse   : </strong> {demande.clientAdresse}</p>
      <p><strong>la date   : </strong>{demande.prestatDate && format(parseISO(demande.prestatDate), 'dd MMMM yyyy', { locale: fr })}</p>
      <p>{formatDistanceToNow(new Date(demande.createdAt), { addSuffix: true, locale: fr })}</p>
      {role === 'prestataire' && (
        <span className="material-symbols-outlined" >presttaire</span>
      )}
      {role === 'client' && (
        <span className="material-symbols-outlined" >client</span>
      )}

    </div>
  );
};

export default DemandesDetails;
