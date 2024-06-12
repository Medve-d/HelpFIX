import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <Image
            src="/HELP-removebg-preview.png" 
            alt="HelpFIX Logo" 
            width={150} 
            height={50} 
            className={styles.logo}
          />
        </Link>
      </div>
      <button className={styles.burger} onClick={toggleMenu}>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
        <span className={styles.burgerLine}></span>
      </button>
      <ul className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
        <li>
          <Link href="/">Accueil</Link>
        </li>
        <li>
          <Link href="/category">Nos services</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
        <li>
          <Link href="/loginPage">Se connecter</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
