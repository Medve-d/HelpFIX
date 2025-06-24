import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';

const MembershipsPaiment = () => {
    const { user } = useAuthContext();
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        if (user && user._id) {
            setUserId(user._id);
        }
    }, [user]);

    const handleUpdateMembership = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            setMessage({ text: 'Utilisateur non identifié', isError: true });
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const response = await fetch(`/api/user/profile/updateMembership/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ membershipStatus: 'freeTrial' })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                setMessage({ 
                    text: 'Votre essai gratuit a été activé avec succès!', 
                    isError: false 
                });
            } else {
                setMessage({ 
                    text: data.error || 'Erreur lors de l\'activation', 
                    isError: true 
                });
            }
        } catch (error) {
            setMessage({ 
                text: 'Erreur de connexion au serveur', 
                isError: true 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="paiment-container">
            <div className="membership-hero">
                <h3 className='fromstitles'>Essai Gratuit</h3>
                <div className="payment-area">
                    <div className='payment-area-1'>
                        <h3 className='fromstexts'>Découvrez notre service</h3>
                        <p className='titles-texts-p'>
                            Profitez de 3 utilisations gratuites pour tester toutes les fonctionnalités.
                        </p>
                        <ul className="benefits-list">
                            <li>✓ Accès complet à la plateforme</li>
                            <li>✓ 3 prestations gratuites</li>
                            <li>✓ Sans engagement</li>
                        </ul>
                    </div>
                    <div className="free-trial-section">
                        <div className="trial-card">
                            <h4>Commencez dès maintenant</h4>
                            <p>Aucune carte bancaire requise</p>
                            <button 
                                onClick={handleUpdateMembership}
                                disabled={isLoading || (user && user.membershipStatus === 'freeTrial')}
                                className="free-trial-button"
                            >
                                {isLoading ? 'Chargement...' : 
                                 user?.membershipStatus === 'freeTrial' ? 'Essai déjà activé' : 'Essayez gratuitement'}
                            </button>
                            {message && (
                                <p className={`message ${message.isError ? 'error' : 'success'}`}>
                                    {message.text}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="hero-description-bk"></div>
                <div className="hero-logo">
                    <img
                        src={`${process.env.PUBLIC_URL}/image/logo-helpfix.png`}
                        alt="HelpFix"
                        className="hero-profile-img"
                    />
                </div>
                <div className="hero-description">
                    <p>Testez notre service sans engagement</p>
                </div>
            </div>
        </div>
    );
};

export default MembershipsPaiment;