import React, { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import PrestationForm from "../components/PrestationForm";
import PrestationDetails from "../components/PrestationDetails";
import "../index.css"; // Fichier CSS dédié

const MesPrestations = () => {
  const [myPrestations, setMyPrestations] = useState([]);
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchMyPrestations = async () => {
      if (user && user.role === 'prestataire') {
        try {
          const response = await fetch('/api/prestation/myprestations', {
            headers: {
              'Authorization': `Bearer ${user.token}`
            }
          });

          if (response.ok) {
            const json = await response.json();
            const sortedPrestations = json.sort(
              (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
            );
            setMyPrestations(sortedPrestations);
          }
        } catch (error) {
          console.error("Erreur lors du chargement des prestations:", error);
        }
      }
    };

    fetchMyPrestations();
  }, [user]);

  const handlePrestationCreated = (newPrestation) => {
    setMyPrestations(prev => [newPrestation, ...prev]);
  };

  const handlePrestationDeleted = (deletedId) => {
    setMyPrestations(prev => prev.filter(p => p._id !== deletedId));
  };

  return (
    <div className="mes-prestations-page">
      <header className="mes-prestations-header">
        <h1>Gestion de mes prestations</h1>
        <p>Créez et gérez vos services proposés aux clients</p>
      </header>

      <div className="mes-prestations-layout">
        <section className="prestation-form-container">
          <div className="form-card">
            <h2>Nouvelle prestation</h2>
            <PrestationForm onPrestationCreated={handlePrestationCreated} />
          </div>
        </section>

        <section className="prestations-list-container">
          <div className="list-header">
            <h2>Mes prestations ({myPrestations.length})</h2>
            {myPrestations.length > 0 && (
              <div className="sort-options">
                <span>Trier par :</span>
                <select>
                  <option>Date (récentes)</option>
                  <option>Date (anciennes)</option>
                  <option>Prix (croissant)</option>
                  <option>Prix (décroissant)</option>
                </select>
              </div>
            )}
          </div>

          {myPrestations.length === 0 ? (
            <div className="empty-state">
              <img src="/images/empty-prestations.svg" alt="Aucune prestation" />
              <p>Vous n'avez pas encore créé de prestations</p>
              <p>Commencez par remplir le formulaire à gauche</p>
            </div>
          ) : (
            <div className="prestations-grid">
              {myPrestations.map(prestation => (
                <PrestationDetails 
                  key={prestation._id} 
                  prestation={prestation}
                  onDelete={handlePrestationDeleted}
                  isOwner={true}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default MesPrestations;