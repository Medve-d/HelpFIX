import React from 'react';
import { Link } from 'react-router-dom';
import { useLogout } from '../../hooks/useLogout'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'


const MobileNavigation = ({ isMenuOpen, handleBurger }) => {

    const { logout } = useLogout()
    const { user } = useAuthContext()
    const navigate = useNavigate()
  
    const handleClick = () => {
      logout()
      navigate('/')
      
    }
  return (
    <div className="mobile-nav">
      <button className="burger-button" onClick={handleBurger}>
        ☰
      </button>
      {/* Conditional rendering for mobile menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <ul className='mobile-ul'>
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
          
    <ul className="navLinks">
      
    </ul>
        </div>
      )}
    </div>
  );
};

export default MobileNavigation;