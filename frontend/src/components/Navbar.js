import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


function Navbar() {

  const { logout } = useLogout()
  const { user, role } = useAuthContext()
  const navigate = useNavigate()

  const handleClick = () => {
    logout()
    navigate('/')
    
  }


  return (
    <nav className="navbar">
      <div className="logoContainer">
        <Link to="/">
        <img
          src="/image/logo-helpfix.png" 
          alt="HelpFIX Logo" 
          width={100} 
          height={100} 
          className="logo"
        /></Link>
      </div>
      <span className="HelloPhrase">
        {role === 'admin' && "Status  : Admin "}
        {role === 'client' && "Status  : client "}
        {role === 'prestataire' && "Status  : prestataire "}
        <br />
        {user ? "Hello "+ user.name : ''}

        </span>
      <ul className="navLinks">
        <li>
          <Link to="/">Accueil</Link>
        </li>
        <li>
          <Link to="/nosServices">Nos services</Link>
        </li>
        <li>
          <Link to="/about">À propos</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
          {user && (
            <li><Link to="/mesdemandes">Mes demande</Link></li>
            
          )}
          
          {user && (
            <li><Link to="/profile">profile</Link></li>
            
          )}
          {user && (
              <button onClick={handleClick}>Log out</button>
          )}
          {!user && (
              <li><Link to="/login">Login</Link></li>
          )}

      </ul>
    </nav>
  );
}

export default Navbar;
