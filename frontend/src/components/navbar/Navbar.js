import React, { useState } from 'react';
import MobileNavigation from "./MobileNavigation";
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {

  const { logout } = useLogout()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate('/')
    
  }
  // State to manage mobile menu visibility
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle mobile menu visibility
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
        <Link to="/categories">Nos services</Link>
      </li>
      <li>
        <Link to="/aboutus">À propos</Link>
      </li>
      <li>
        <Link to="/contactus">Contact</Link>
      </li>
      {user ? (
        <>
          <li><Link to="/mesdemandes">Mes demande</Link></li>
          <li><Link to="/profile"><span className="material-symbols-outlined" aria-label="Profile">person</span></Link></li>
          <li><button className='logout' onClick={handleClick}>Log out</button></li>
        </>
      ) : (
        <li><Link to="/login">Login</Link></li>
      )}
    </ul>
  </div>

  <MobileNavigation isMenuOpen={isMenuOpen} handleBurger={handleBurger} />
</nav>

  );
};

export default Navbar;
