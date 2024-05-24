import React from 'react';
import styles from '../styles/Loginform.module.css'; // Assurez-vous que ce chemin est correct

const LoginForm = () => {
  return (
    <div className={styles.formLoginSignin}>
      <form className={styles.signinForm} action="/login" method="post">
        <h2>Login</h2>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Your username"
          required
          className={styles.input}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Your password"
          required
          className={styles.input}
        />
        <input type="submit" value="Login" className={styles.input} />
        <a href="/signinPage" className={styles.input}>Inscription</a>
      </form>
    </div>
  );
};

export default LoginForm;
