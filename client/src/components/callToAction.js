import React from 'react';
import '../components/styles/calltoaction.css'; // Fichier CSS à créer

const CallToAction = () => {
    return (
        <section className="cta-section">
            <div className="cta-content">
                <h2>Vous êtes un professionnel ?</h2>
                <p>Rejoignez notre communauté de prestataires et trouvez de nouveaux clients dès aujourd'hui !</p>
                <a href="/signup-pro" className="cta-button">Proposer mes services</a>
            </div>
        </section>
    );
};

export default CallToAction;