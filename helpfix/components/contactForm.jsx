import React from 'react';
import styles from '../styles/contactForm.module.css'; // Assurez-vous que ce chemin est correct

const ContactForm = () => {
  return (
    <div className={styles.formLoginSignin}>
      <form className={styles.signinForm} action="/inscription" method="post">
        <h2>Vous faire appeler par un conseiller</h2>
        <label htmlFor="firstname">Prénom</label>
        <input
          type="text"
          id="firstname"
          name="firstname"
          placeholder="Votre prénom"
          required
          className={styles.input}
        />
        <label htmlFor="surname">Nom</label>
        <input
          type="text"
          id="surname"
          name="surname"
          placeholder="Votre nom"
          required
          className={styles.input}
        />
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre adresse e-mail"
          required
          className={styles.input}
        />
        <label htmlFor="confirm-email">Confirmer l'E-mail</label>
        <input
          type="email"
          id="confirm-email"
          name="confirm-email"
          placeholder="Confirmer votre e-mail"
          required
          className={styles.input}
        />
        <label htmlFor="password">Mot de passe</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Votre mot de passe"
          required
          className={styles.input}
        />
        <input type="submit" value="S'inscrire" className={styles.submitButton} />
        <a href="/loginPage" className={styles.signInLink}>Connexion</a>
      </form>
    </div>
  );
};

export default ContactForm;
