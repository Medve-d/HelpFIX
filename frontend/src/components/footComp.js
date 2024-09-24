
import React from 'react';
import { FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
    <div className="footer-container">
      <div className="footer-links">
        <p className='footer-brand'><strong>HelpFIX.</strong></p>
        <div className='links-footer-container'>
            <a href="#">HelpFix@gmail.com</a>
            <a href="#">04 02 XX XX XX</a>
            <a href="#"><FaInstagram /></a>
        </div>
        <div className='links-footer-container'>
            <a href="/aboutus">À propos</a>
            <a href="#">Terms of Service</a>
            <a href="/contactus">Contact</a>
        </div>
      </div>
      <p className='footer-cr'>&copy; 2024 HelpFIX. All Rights Reserved.</p>
    </div>
  </footer>
  );
};

export default Footer;


