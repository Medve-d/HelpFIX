import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logoContainer">
        <img
          src="/images/logo-helpfix.png" 
          alt="HelpFIX Logo" 
          width={100} 
          height={100} 
          className="logo"
        />
      </div>
      <span className="HelloPhrase">
        Hello {}!
      </span>
      <button className="burger">
        <span className="burgerLine"></span>
        <span className="burgerLine"></span>
        <span className="burgerLine"></span>
      </button>
      <ul className="navLinks">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/category">Nos services</Link>
        </li>
        <li>
          <Link to="/about">À propos</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
        <li>
          <Link to="/profile">Profil</Link>
        </li>
        <li>
          <Link to="/loginPage">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
