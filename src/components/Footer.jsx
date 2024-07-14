import React from 'react';
import '../css/Footer.css';

const Footer = ({ onAboutClick, onContactClick, onPrivacyClick }) => {
  return (
    <footer className="footer">
      <div className="footer-content">
        
        <div className="footer-nav">
          <button className="footer-button" onClick={onAboutClick}>Acerca de</button>
          <button className="footer-button" onClick={onContactClick}>Contacto</button>
          <button className="footer-button" onClick={onPrivacyClick}>Privacidad</button>
        </div>
        <p>&copy; 2024 Nutrición y Bienestar Integral. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
