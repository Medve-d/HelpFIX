
import React from 'react';
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>&copy; {new Date().getFullYear()} HelpFIX Tous droits réservés.</p>
        <ul className={styles.links}>
          <li><a href="/privacy">Politique de confidentialité</a></li>
          <li><a href="/terms">Conditions d'utilisation</a></li>
          <li><a href="/contact">Contactez-nous</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
