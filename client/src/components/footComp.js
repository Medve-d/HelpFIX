import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p>&copy; {new Date().getFullYear()} HelpFIX Tous droits réservés.</p>
        <ul className="links">
          <li><Link to="/privacy">Politique de confidentialité</Link></li>
          <li><Link to="/terms">Conditions d'utilisation</Link></li>
          <li><Link to="/contactus">Contactez-nous</Link></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
