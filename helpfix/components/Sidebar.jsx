import React from 'react';
import '../styles/Sidebar.module.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <button className="sidebar-button">Information Personnel</button>
      <button className="sidebar-button">Historique</button>
      <button className="sidebar-button">Sécurité</button>
      <button className="sidebar-button">Transaction</button>
      <button className="sidebar-button">Aide</button>
      <button className="sidebar-button logout">Déconnexion</button>
    </div>
  );
}

export default Sidebar;
