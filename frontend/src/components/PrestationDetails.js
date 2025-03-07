import { useEffect, useRef } from 'react';
import { usePrestationsContext } from '../hooks/usePrestationsContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { fr } from 'date-fns/locale'; 

gsap.registerPlugin(ScrollTrigger);

const PrestationDetails = ({ prestation }) => {
  const { dispatch } = usePrestationsContext();
  const { user, role } = useAuthContext();
  const navigate = useNavigate();

  const cardRef = useRef(null); // Référence pour la carte

  // Animation GSAP
  useEffect(() => {
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 50 }, // Départ : caché et décalé vers le bas
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cardRef.current, // Animation déclenchée lorsque l'élément entre dans la vue
          start: 'top 80%', // Position de déclenchement
          end: 'bottom 20%', // Position de fin (optionnel)
          toggleActions: 'play none none none', // Joue l'animation uniquement
        },
      }
    );
  }, []);

  const handleClickDelete = async () => {
    if (!user) {
      return;
    }
    
    const response = await fetch('/api/prestation/' + prestation._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_PRESTATION', payload: json });
    }
  };

  const handleClickView = () => {
    if (!user) {
      return;
    }
    navigate(`/prestation/${prestation._id}`);
  };

  return (
    <div className="workout-details" ref={cardRef}>
      <h4>{prestation.ville}</h4>
      <p><strong>{prestation.title}</strong></p>
      <p><strong>Job   : </strong> {prestation.job}</p>
      <p><strong>Nom   : </strong> {prestation.userName}</p>
      <p><strong>Prix   : </strong> {prestation.price}€</p>
      <p><strong>Description   : </strong> {prestation.description}</p>
      <p>{formatDistanceToNow(new Date(prestation.createdAt), { addSuffix: true, locale: fr })}</p>
      {role === 'prestataire' && (
        <span className="material-symbols-outlined" onClick={handleClickDelete} title='Supprimer'>delete</span>
      )}
      {role === 'client' && (
        <span className="material-symbols-outlined" onClick={handleClickView} title='ouvrir'>add</span>
      )}
    </div>
  );
};

export default PrestationDetails;
