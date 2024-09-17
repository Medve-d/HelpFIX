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

const DemandesDetails = ({ demande, onOpenChat }) => {
  
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
  
  const handleAccept = async () => {
    if (!user) {
      return;
    }
  
    try {
      const response = await fetch('/api/demande/acceptdemande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ demandId: demande._id, user_id: user._id })
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Demande accepted and message sent:', result);
        // Optionally, redirect to the chat page or update the UI
      } else {
        console.error('Failed to accept demande:', result.message);
      }
    } catch (error) {
      console.error('Error accepting demande:', error);
    }
  };
  
  const handleOpenChat = () => {
    if (!user) return;

    // Trigger onOpenChat with the current demande ID
    onOpenChat(demande._id);
  };

  return (
    <div className="workout-details">
      <p><strong>Title   : </strong> {demande.title}</p>
      {role === 'prestataire' && (
        <p><strong>Client Name   : </strong> {demande.clientName}</p>
      )}
      {role === 'client' && (
        <p><strong> Prestataire Nom   : </strong> {demande.userName}</p>
      )}
      <p><strong>Client Message   : </strong> {demande.clientMessage}</p>
      <p><strong>Address   : </strong> {demande.clientAdresse}</p>
      <p><strong>Date   : </strong>{demande.prestatDate && format(parseISO(demande.prestatDate), 'dd MMMM yyyy', { locale: fr })}</p>
      <p>{formatDistanceToNow(new Date(demande.createdAt), { addSuffix: true, locale: fr })}</p>
      {role === 'client' && (
        <div className="mesbutton-container">
          <button className="mesbutton deny" onClick={handleCancel} title='Annuler la demande'>Annuler la demande</button>
        </div>
      )}
      {role === 'prestataire' && demande.status === 'pending' && (
        <div className="mesbutton-container">
          <button className="mesbutton accept" onClick={handleAccept} title='Accepter et discuter'>Accepter et discuter</button>
          <button className="mesbutton deny" onClick={handleCancel} title='Refuser la demande'>Refuser la demande</button>
        </div>
      )}
      { demande.status === 'accepted' && (
        <div className="mesbutton-container">
          <button className="mesbutton accept" onClick={handleOpenChat} title='Ouvrir le chat'>Open chat</button>
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