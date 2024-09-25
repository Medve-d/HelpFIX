import React from "react";
import "../index.css";

const SubscriptionOptions = () => {
  return (
    <div className="pricing-container">
      <div className="card" style={{ backgroundColor: "#f7f7f7", color: "#333" }}>
        <h2>0€</h2>
        <h3>Essai Gratuit</h3>
        <p>Essayez notre service gratuitement 3 fois, puis passez en Premium.</p>
        <p>Profitez de 3 utilisations gratuites pour découvrir notre service avant de souscrire à un abonnement.</p>
        <button>Démarrez</button>
      </div>

      <div className="card" style={{ backgroundColor: "#d0b9b8", color: "#333" }}>
        <h2>9,99€</h2>
        <h3>Premium Mensuel</h3>
        <p>Abonnement mensuel, sans engagement, pour un accès illimité à tous nos services.</p>
        <p>Accès illimité Mensuel - Accédez à tous nos services sans restriction. Flexibilité maximale, résiliez quand vous le souhaitez !</p>
        <button>Démarrez</button>
      </div>

      <div className="card" style={{ backgroundColor: "#f0d467", color: "#333" }}>
        <h2>99,99€</h2>
        <h3>Premium Mensuel</h3>
        <p>Bénéficiez de 2 mois offerts avec l'abonnement annuel. Payez seulement 99,99€/an au lieu de 119,88€, soit une économie de 16% !</p>
        <p>Accès illimité Annuel - Profitez d'une année entière de tranquillité avec un accès prioritaire et économisez 16% sur le prix total.</p>
        <button>Démarrez</button>
      </div>
    </div>
  );
};

export default SubscriptionOptions;
