import React from 'react'; // Import React if it's not included in your project setup
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "../hooks/useAuthContext"

const Memberships = () => {
    const { user, role } = useAuthContext();
    const navigate = useNavigate();
  
    if (!user || role!=='prestataire') {
        navigate('/');
        return;
    }

  return (
    <div className='memberships-cards-container'>
        
    <div className="first hero">
        <div className='member-title'>
         <h3 className='titles-texts'>Essai Gratuit</h3>
         <p className='titles-texts-p'>Profitez de 3 utilisations gratuites pour découvrir notre service avant de souscrire à un abonnement.</p>
        </div>
        <div className="hero-description-bk"></div>
        <div className="hero-logo">
            <img
            src={`${process.env.PUBLIC_URL}/image/logo-helpfix.png`}
            alt="membership" 
            className="hero-profile-img"
            />
            </div>
        <div className="hero-description">
            <p>Essayez notre service gratuitement 3 fois.</p>
        </div>
        <div className="hero-date">
            <p>Gratuit</p>
        </div>
        <div className="hero-btn">
            <a href="membershipspaiment">Learn More</a>
        </div>
    </div>
    <div className="second hero">
        <div className='member-title'>
         <h3 className='titles-texts'>Premium Mensuel</h3>
         <p className='titles-texts-p'>Accès Illimité Mensuel : Accès illimité à tous nos services sans restriction. Flexibilité maximale, résiliez quand vous le souhaitez !</p>
        </div>
        <div className="hero-description-bk"></div>
        <div className="hero-logo">
            <img
            src={`${process.env.PUBLIC_URL}/image/logo-helpfix.png`}
            alt="membership" 
            className="hero-profile-img"
            />
            </div>
        <div className="hero-description">
            <p>Abonnement mensuel, sans engagement.</p>
        </div>
        <div className="hero-date">
            <p>9,99€/mois</p>
        </div>
        <div className="hero-btn">
            <a href="membershipspaiment">Learn More</a>
        </div>
    </div>
    <div className="third hero">
        <div className='member-title'>
         <h3 className='titles-texts'>Premium Annuel</h3>
         <p className='titles-texts-p'>Accès Illimité Annuel : Profitez d’une année entière de tranquillité avec un accès prioritaire et économisez 16% sur le prix total. Faites le choix intelligent avec notre meilleure offre !</p>
        </div>
        <div className="hero-description-bk"></div>
        <div className="hero-logo">
            <img
            src={`${process.env.PUBLIC_URL}/image/logo-helpfix.png`}
            alt="membership" 
            className="hero-profile-img"
            />
            </div>
        <div className="hero-description">
            <p>Bénéficiez de 2 mois offerts avec l’abonnement annuel.</p>
        </div>
        <div className="hero-date">
            <p>99,99€</p>
        </div>
        <div className="hero-btn">
            <a href="/membershipspaiment">Learn More</a>
        </div>
    </div>
    </div>
  );
};

export default Memberships;
