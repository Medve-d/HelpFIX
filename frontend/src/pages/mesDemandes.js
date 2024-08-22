import React, { useState, useEffect } from "react";
import { useDemandeContext } from "../hooks/useDemandeContext";
import { useAuthContext } from "../hooks/useAuthContext";
import DemandesDetails from "../components/demandesDetails";
import SideComponent from "../components/chat";

const MesDemandes = () => {
  const { demandes, dispatch } = useDemandeContext();
  const { user, role } = useAuthContext();
  const [isSideComponentOpen, setSideComponentOpen] = useState(false);

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
  }, [dispatch, user, role]);

  const toggleSideComponent = () => {
    setSideComponentOpen(!isSideComponentOpen);
  };

  return (
    <div>
      <div className="home">
        <div className="workouts">
          {demandes && demandes.map(demande => (
            <DemandesDetails demande={demande} key={demande._id} />
          ))}
        </div>
      </div>
      {isSideComponentOpen && (
        <SideComponent isOpen={isSideComponentOpen} closeSideComponent={toggleSideComponent} />
      )}
      <button className="side-button" onClick={toggleSideComponent} title="Ouvrez le chat">
        <span className="material-symbols-outlined">arrow_back_ios_new</span>
      </button>
    </div>
  );
};

export default MesDemandes;
