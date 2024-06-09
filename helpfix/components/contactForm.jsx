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
        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Votre adresse e-mail"
          required
          className={styles.input}
        />
        <label htmlFor="phoneNumber">Numéro de téléphone</label>
        <input
          type="phone"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Numéro de contact"
          required
          className={styles.input}
        />
        <input type="submit" value="Être contacté" className={styles.submitButton} />
      </form>
    </div>
  );
};

export default ContactForm;
