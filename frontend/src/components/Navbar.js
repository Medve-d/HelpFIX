import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


function Navbar() {

  const { logout } = useLogout()
  const { user } = useAuthContext()
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
          <Link to="/contact">Contact</Link>
        </li>
          {user && (
            <li><Link to="/mesdemandes">Mes demande</Link></li>
            
          )}
          
          {user && (
            <li><Link to="/profile"><span className="material-symbols-outlined">person</span></Link></li>
            
          )}
          {user && ( 
            <button className='logout' onClick={handleClick}>Log out</button>
          )}
          
          {!user && (
              <li><Link to="/login">Login</Link></li>
          )}

      </ul>
    </nav>
  );
}

export default Navbar;