import React, { useState } from 'react'; // Import useState
import { useDemandeContext } from "../hooks/useDemandeContext";
import { useAuthContext } from '../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

// Confirmation Modal Component
const ConfirmationModal = ({ onConfirm, onCancel }) => (
  <div className="confirmation-modal">
    <p>Êtes-vous sûr ?</p>
    <button className='mesbutton confirm yes' onClick={onConfirm}>Yes</button>
    <button className='mesbutton confirm no' onClick={onCancel}>No</button>
  </div>
);

const DemandesDetails = ({ demande }) => {
  
  const { dispatch } = useDemandeContext();
  const { user, role } = useAuthContext();
  const [showConfirm, setShowConfirm] = useState(false); // State to show/hide confirmation modal

  if (!user) {
    return;
  }
  
  const handleCancel = () => {
    setShowConfirm(true); // Show confirmation modal
  };

  const handleConfirmCancel = async () => {
    setShowConfirm(false); // Hide confirmation modal
    if (!user) {
      return;
    }
    
    const response = await fetch('/api/demande/' + demande._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_DEMANDE', payload: json });
    }
  };

  const handleDeny = () => {
    // Handle deny logic
  };

  const handleAccept = () => {
    // Handle accept and open chat logic
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
      {role === 'client' && (
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
      {showConfirm && (
        <ConfirmationModal 
          onConfirm={handleConfirmCancel} 
          onCancel={() => setShowConfirm(false)} 
        />
      )}
    </div>
  );
};

export default DemandesDetails;
