import React, { useState, useEffect } from 'react';
import PrestationForm from '../components/PrestationFormulaire';

const PrestataireDashboard = () => {
  const [prestations, setPrestations] = useState([]);

  useEffect(() => {
    // Simulez la récupération des prestations depuis une API
    const fetchPrestations = async () => {
      // Remplacez par un appel API réel
      const mockPrestations = [
        {
          _id: '66f54aeeae46e1541a224ae0',
          title: 'Jardinage',
          price: 20,
          job: 'Jardinage',
          description: 'Je suis disponible pour toutes prestation concernant le jardinage',
          ville: 'Paris',
          category: 'Jardinage et Entretien Extérieur',
          userName: 'Claire Dubois',
          user_id: '66f54a62dcf47581a4d58275'
        },
        // Ajoutez d'autres prestations ici
      ];
      setPrestations(mockPrestations);
    };

    fetchPrestations();
  }, []);

  const handleAddPrestation = (newPrestation) => {
    // Simulez l'ajout d'une prestation à une API
    setPrestations(prevPrestations => [...prevPrestations, { ...newPrestation, _id: `mock_id_${prevPrestations.length + 1}` }]);
  };

  return (
    <div>
      <h1>Tableau de bord du prestataire</h1>
      <PrestationForm onAddPrestation={handleAddPrestation} />
      <div>
        <h2>Prestations actives</h2>
        <ul>
          {prestations.map(prestation => (
            <li key={prestation._id}>
              <h3>{prestation.title}</h3>
              <p>Prix: {prestation.price} €</p>
              <p>Type de travail: {prestation.job}</p>
              <p>Description: {prestation.description}</p>
              <p>Ville: {prestation.ville}</p>
              <p>Catégorie: {prestation.category}</p>
              <p>Proposé par: {prestation.userName}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PrestataireDashboard;
