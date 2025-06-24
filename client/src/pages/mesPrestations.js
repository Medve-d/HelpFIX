import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import '../index.css';

const MesPrestationsPage = () => {
  const { user } = useAuthContext();
  const [activePrestations, setActivePrestations] = useState([]);
  const [newPrestation, setNewPrestation] = useState({
    title: '',
    price: '',
    ville: user?.ville || '',
    job: '',
    description: '',
    category: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const jobOptions = [
    'Déménageur',
    'Tutorat',
    'Jardinage',
    'Plombier',
    'Entretien',
    'Réparation'
  ];

  // Charger les prestations actives
  useEffect(() => {
    const fetchPrestations = async () => {
      try {
        const response = await fetch(`/api/prestations/mesprestations?prestataireId=${user._id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });
        const data = await response.json();
        
        if (!response.ok) throw new Error(data.error || 'Erreur de chargement');
        
        setActivePrestations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user && user.role === 'prestataire') {
      fetchPrestations();
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPrestation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const response = await fetch('/api/prestations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          ...newPrestation,
          user_id: user._id,
          userName: `${user.name} ${user.familyName}`
        })
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || 'Erreur de création');

      setActivePrestations([...activePrestations, data]);
      setSuccess('Prestation créée avec succès!');
      setNewPrestation({
        title: '',
        price: '',
        ville: user.ville,
        job: '',
        description: '',
        category: ''
      });
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div className="loading">Chargement en cours...</div>;

  return (
    <div className="mes-prestations-container">
      <h1>Mes Prestations</h1>
      
      {/* Section des prestations actives */}
      <section className="active-prestations">
        <h2>Mes Prestations Actives</h2>
        
        {activePrestations.length === 0 ? (
          <p>Aucune prestation active pour le moment</p>
        ) : (
          <div className="prestations-grid">
            {activePrestations.map(prestation => (
              <div key={prestation._id} className="prestation-card">
                <h3>{prestation.title}</h3>
                <p><strong>Service:</strong> {prestation.job}</p>
                <p><strong>Prix:</strong> {prestation.price}€</p>
                <p><strong>Ville:</strong> {prestation.ville}</p>
                <p><strong>Description:</strong> {prestation.description}</p>
                <p><strong>Catégorie:</strong> {prestation.category}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Formulaire pour proposer une nouvelle prestation */}
      <section className="new-prestation-form">
        <h2>Proposer une Nouvelle Prestation</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Titre:</label>
            <input
              type="text"
              name="title"
              value={newPrestation.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Type de service:</label>
            <select
              name="job"
              value={newPrestation.job}
              onChange={handleInputChange}
              required
            >
              <option value="">Sélectionnez un service</option>
              {jobOptions.map(job => (
                <option key={job} value={job}>{job}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Prix (€):</label>
            <input
              type="number"
              name="price"
              value={newPrestation.price}
              onChange={handleInputChange}
              required
              min="0"
            />
          </div>

          <div className="form-group">
            <label>Ville:</label>
            <input
              type="text"
              name="ville"
              value={newPrestation.ville}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Catégorie:</label>
            <input
              type="text"
              name="category"
              value={newPrestation.category}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea
              name="description"
              value={newPrestation.description}
              onChange={handleInputChange}
              required
              rows="4"
            />
          </div>

          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="submit-button">
            Proposer cette prestation
          </button>
        </form>
      </section>
    </div>
  );
};

export default MesPrestationsPage;