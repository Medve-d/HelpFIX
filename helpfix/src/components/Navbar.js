import React from 'react';
import { BrowserRouter as Router, Link } from 'react-router-dom'; // Importez BrowserRouter et Link depuis react-router-dom
import './navbar.css'; // Importation du fichier CSS pour la stylisation

class Navbar extends React.Component {
  render() {
    return (
      <Router> {/* Enveloppez votre contenu avec le Router */}
        <nav className="navbar">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item"> {/* Utilisez Link au lieu de <a> */}
              Mon Logo
            </Link>
          </div>
          <div className="navbar-menu">
            <div className="navbar-start">
              <Link to="/" className="navbar-item"> {/* Utilisez Link pour les autres liens */}
                Accueil
              </Link>
              <Link to="/about" className="navbar-item">
                À propos
              </Link>
              <Link to="/contact" className="navbar-item">
                Contact
              </Link>
            </div>
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <Link to="/signup"> {/* Utilisez Link pour la redirection vers la page d'inscription */}
                    <strong>S'inscrire</strong>
                  </Link>
                  <Link to="/login" className="button is-light"> {/* Utilisez Link pour la redirection vers la page de connexion */}
                    Se connecter
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </Router>
    );
  }
} 

export default Navbar;
