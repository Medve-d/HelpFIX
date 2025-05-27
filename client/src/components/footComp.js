
import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} HelpFIX Tous droits réservés.</p>
        <ul className="links">
          <li><a href="/privacy">Politique de confidentialité</a></li>
          <li><a href="/terms">Conditions d'utilisation</a></li>
          <li><a href="/contactus">Contactez-nous</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;


