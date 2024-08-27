import React, { useRef, useEffect } from 'react';
import { useDemandeContext } from '../../hooks/useDemandeContext';
import { useAuthContext } from "../../hooks/useAuthContext";
import Chatline from "./chatline";

const SideComponent = ({ isOpen, closeSideComponent, onSelectChatLine }) => {
  const sideComponentRef = useRef(null);

  const { demandes, dispatch } = useDemandeContext();
  const { user, role } = useAuthContext();

  useEffect(() => {
    const fetchDemandes = async () => {
      let endpoint;

      if (role === 'client') {
        endpoint = '/api/demande/clientdemande';
      } else if (role === 'prestataire') {
        endpoint = '/api/demande/prestatairedemande';
      } else {
        return;
      }

      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });

      if (response.ok) {
        const json = await response.json();
        dispatch({ type: 'SET_DEMANDE', payload: json });
      }
    };

    if (user) {
      fetchDemandes();
    }

    const handleClickOutside = (event) => {
      if (sideComponentRef.current && !sideComponentRef.current.contains(event.target)) {
        closeSideComponent();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeSideComponent, dispatch, user, role]);

  return (
    <div
      ref={sideComponentRef}
      className={`side-component ${isOpen ? 'open' : ''}`}
    >
      <button className="close-button" onClick={closeSideComponent}>
        <strong><span className="material-symbols-outlined">arrow_forward_ios</span></strong>
      </button>
      <div className='sideContent'> 
      <h4 className="close-button">Messagerie</h4>
      <div className="chatLineContaner">
        {demandes && demandes.map(demande => (
          <Chatline
            demande={demande}
            key={demande._id}
            onClick={onSelectChatLine} // Pass the handler function to Chatline
          />
        ))}
      </div>
      </div>
    </div>
  );
};

export default SideComponent;
