import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

const DemandesDetails = ({ demande }) => {
  const { role } = useAuthContext();
  
  const handleCancel = () => {
    // Handle accept and open chat logic
  };
  const handleAccept = () => {
    // Handle accept and open chat logic
  };

  const handleDeny = () => {
    // Handle deny logic
  };

  const isPending = demande.status === 'pending'; // Example status check

  return (
    <div className="workout-details">
      <p><strong>Title   : </strong> {demande.title}</p>
      {role === 'prestataire' && (
        <p><strong>Client Name   : </strong> {demande.clientName}</p>
      )}
      {role === 'client' && (
        <p><strong>Service Provider Name   : </strong> {demande.userName}</p>
      )}
      <p><strong>Client Message   : </strong> {demande.clientMessage}</p>
      <p><strong>Address   : </strong> {demande.clientAdresse}</p>
      <p><strong>Date   : </strong>{demande.prestatDate && format(parseISO(demande.prestatDate), 'dd MMMM yyyy', { locale: fr })}</p>
      <p>{formatDistanceToNow(new Date(demande.createdAt), { addSuffix: true, locale: fr })}</p>
      {role === 'client' && !isPending && (
        <div className="mesbutton-container">
          
          <button className="mesbutton deny" onClick={handleCancel} title='Refuser la demande'>Annuler la demande</button>
        </div>
      )}
      {role === 'prestataire' && !isPending && (
        <div className="mesbutton-container">
          <button className="mesbutton accept" onClick={handleAccept} title='Accepter et discuter'>Accepter et discuter</button>
          <button className="mesbutton deny" onClick={handleDeny} title='Refuser la demande'>Refuser la demande</button>
        </div>
      )}
      </div>
  );
};

export default DemandesDetails;
