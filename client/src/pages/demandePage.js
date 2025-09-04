import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ChatWidget from '../components/chatWidget'; // Vérifie le chemin

const PrestationDetailsPage = () => {
  const { id } = useParams(); // l'ID de la prestation depuis l'URL
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [prestation, setPrestation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    const fetchPrestation = async () => {
      if (!user) {
        setError('⚠️ Vous devez être connecté pour voir cette page.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/prestation/${id}`, {
          headers: {
            'Authorization': `Bearer ${user.token}`
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Erreur lors de la récupération de la prestation.');
        }

        const json = await response.json();
        setPrestation(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestation();
  }, [id, user]);

  const handleDiscuter = () => {
    setShowChat(true); // Ouvrir le chat
  };

  const handleRevenirEnArriere = () => {
    navigate(-1); // Retour à la page précédente
  };

  // --- ÉTATS ---
  if (loading) {
    return <div className="loading">Chargement...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!prestation) {
    return <div>Aucune prestation trouvée.</div>;
  }

  return (
    <div className="prestation-details-page">
      <h2>Détails de la Prestation</h2>
      
      <div className="prestation-details">
        <p><strong>Titre :</strong> {prestation.title}</p>
        <p><strong>Prix :</strong> {prestation.price} €</p>
        <p><strong>Type de travail :</strong> {prestation.job}</p>
        <p><strong>Description :</strong> {prestation.description}</p>
        <p><strong>Ville :</strong> {prestation.ville}</p>
        <p><strong>Catégorie :</strong> {prestation.category}</p>
        <p><strong>Proposé par :</strong> {prestation.userName}</p>
      </div>

      <div className="button-container">
        <button className="mesbutton discuss" onClick={handleDiscuter}>
          💬 Discuter avec le prestataire
        </button>
        <button className="mesbutton back" onClick={handleRevenirEnArriere}>
          ⬅️ Revenir en arrière
        </button>
      </div>

      {showChat && prestation._id && (
        <ChatWidget
          prestataireId={prestation.user_id}
          prestationId={prestation._id}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default PrestationDetailsPage;
