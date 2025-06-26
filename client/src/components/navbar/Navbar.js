import React, { useState } from 'react';
import MobileNavigation from "./MobileNavigation";
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout';
import { useAuthContext } from '../../hooks/useAuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleClick = () => {
    logout();
    navigate('/');
  };

  const handleBurger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/">
          <img
            src="/image/logo-helpfix.png" 
            alt="HelpFIX Logo" 
            width={100} 
            height={100} 
            className="logo"
          />
        </Link>
      </div>

      <div className="nav-container">
        <ul className="navLinks">
          <li>
            <Link to="/">Accueil</Link>
          </li>
          <li>
            <Link to="/categories">Catégories</Link>
          </li>
          <li>
            <Link to="/aboutus">À propos</Link>
          </li>
          <li>
            <Link to="/contactus">Contact</Link>
          </li>
          
          {user ? (
            <>
              {user.role === 'prestataire' ? (
                <>
                  <li><Link to="/historique">Historique</Link></li>
                  <li><Link to="/profile">Profil</Link></li>
                </>
              ) : (
                <li><Link to="/mesdemandes">Mes demandes</Link></li>
              )}
              <li>
                <button className='logout' onClick={handleClick}>
                  Déconnexion
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login">Connexion</Link></li>
          )}
        </ul>
      </div>

      <MobileNavigation 
        isMenuOpen={isMenuOpen} 
        handleBurger={handleBurger} 
        user={user}
      />
    </nav>
  );
};

export default Navbar;