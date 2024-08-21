
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';


const DemandesDetails = ({ demande }) => {
  const { role } = useAuthContext();

  

  return (
    <div className="workout-details">
      <p><strong>Title   : </strong> {demande.title}</p>
      {role === 'prestataire' && (
        <p><strong>client Nom   : </strong> {demande.clientName}</p>
      )}
      {role === 'client' && (
        <p><strong>Nom de prestatire   : </strong> {demande.userName}</p>
      )}
      <p><strong>Message de client   : </strong> {demande.clientMessage}</p>
      <p><strong>l'adresse   : </strong> {demande.clientAdresse}</p>
      <p><strong>la date   : </strong>{demande.prestatDate && format(parseISO(demande.prestatDate), 'dd MMMM yyyy', { locale: fr })}</p>
      <p>{formatDistanceToNow(new Date(demande.createdAt), { addSuffix: true, locale: fr })}</p>
      
    </div>
  );
};

export default DemandesDetails;
