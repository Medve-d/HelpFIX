import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale';

const Chatline = ({ demande }) => {
    const { user, role } = useAuthContext();
    if (!user) {
      return;
    }
    
  return (
    <div className='chat-lines' style={{ cursor: 'pointer', padding: '10px', borderBottom: '2px solid #ccc' }}>
        {role === 'prestataire' && (
            <div>
                <p><strong>{demande.clientName}</strong>&nbsp;{formatDistanceToNow(new Date(demande.createdAt), { addSuffix: true, locale: fr })}</p>
            </div>
        )}
        
        {role === 'client' && (
            <div>
                <p><strong>{demande.userName}</strong>&nbsp;{formatDistanceToNow(new Date(demande.createdAt), { locale: fr })}</p>
            </div>
        )}
    </div>
)
}

export default Chatline