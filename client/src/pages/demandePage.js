import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import ChatWidget from '../components/chatWidget';

const PrestationDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  const [prestation, setPrestation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [prestataireId, setPrestataireId] = useState(null);

  useEffect(() => {
    const fetchPrestation = async () => {
      if (!user) {
        setError('⚠️ Vous devez être connecté pour voir cette page.');
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/prestation/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || 'Erreur lors de la récupération.');
        }

        const data = await res.json();
        setPrestation(data);
        setPrestataireId(data.user_id); // ID du prestataire
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPrestation();
  }, [id, user]);

  const handleDiscuter = () => {
    if (!prestataireId) return;
    setShowChat(true); // ouvre le chat
  };

  const handleRevenirEnArriere = () => navigate(-1);

  if (loading) return <div className="loading">Chargement...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!prestation) return <div>Aucune prestation trouvée.</div>;

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

      {showChat && prestataireId && (
        <ChatWidget
          prestataireId={prestataireId}
          prestationId={prestation._id}
          isOpen={showChat} // <-- IMPORTANT
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default PrestationDetailsPage;
