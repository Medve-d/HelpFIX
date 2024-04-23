import React from 'react';
import './navbar.css'; // Importation du fichier CSS pour la stylisation

class Navbar extends React.Component {
  render() {
    return (
      <nav className="navbar">
        <div className="navbar-brand">
          <a className="navbar-item" href="/">
            Mon Logo
          </a>
        </div>
        <div className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item" href="/">
              Accueil
            </a>
            <a className="navbar-item" href="/about">
              À propos
            </a>
            <a className="navbar-item" href="/contact">
              Contact
            </a>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <a className="button is-primary" href="/signup">
                  <strong>S'inscrire</strong>
                </a>
                <a className="button is-light" href="/login">
                  Se connecter
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
