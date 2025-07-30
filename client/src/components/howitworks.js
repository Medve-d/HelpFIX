import React from 'react';
import '../components/styles/howitwork.css'; // Fichier CSS à créer

const HowItWorks = () => {
  return (
    <section className="how-it-works">
      <h2 className="hometitles">Comment ça marche ?</h2>
      <div className="steps">
        <div className="step">
          <div className="step-icon">1</div>
          <h3>Recherchez</h3>
          <p>Trouvez le service dont vous avez besoin grâce à notre recherche simple et efficace.</p>
        </div>
        <div className="step">
          <div className="step-icon">2</div>
          <h3>Contactez</h3>
          <p>Prenez contact avec le prestataire de votre choix en toute sécurité via notre plateforme.</p>
        </div>
        <div className="step">
          <div className="step-icon">3</div>
          <h3>Validez</h3>
          <p>Une fois le service rendu, validez la prestation et laissez un avis pour la communauté.</p>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;