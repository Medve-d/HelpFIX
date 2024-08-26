import React, { useState, useEffect } from "react";
import { useDemandeContext } from "../hooks/useDemandeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DemandesDetails from "../components/demandesDetails";
import SideComponent from "../components/chatFO/SideComponent";
import { useNavigate } from 'react-router-dom';

const MesDemandes = () => {
  const { demandes, dispatch } = useDemandeContext();
  const { user, role } = useAuthContext();
  const [isSideComponentOpen, setSideComponentOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
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
  }, [dispatch, user, role, navigate]);

  const toggleSideComponent = (room) => {
    setSelectedRoom(room);
    setSideComponentOpen(!isSideComponentOpen);
  };

  return (
    <div>
      <div className="home">
        <div className="workouts">
          {demandes && demandes.map(demande => (
            <DemandesDetails
              demande={demande}
              key={demande._id}// Assuming room is demande._id
            />
            
          ))}
        </div>
      </div>
      {isSideComponentOpen && (
        <SideComponent isOpen={isSideComponentOpen} closeSideComponent={() => setSideComponentOpen(false)} room={selectedRoom} />
      )}
      <button className="side-button" onClick={() => toggleSideComponent(selectedRoom)} title="Ouvrez le chat">
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
    </div>
  );
};

export default MesDemandes;
