import React from 'react';
import './Footer.css';
import logoFooter from "../Imagenes/LogoFooter.png";

export default function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={logoFooter} alt="McLaren Logo" />
        </div>
        <div className="footer-links">
          <a href="https://mclaren-alpha.vercel.app/">Home</a>
          <a href="https://mclaren-alpha.vercel.app/Soporte">Soporte</a>
        </div>
        <div className="footer-social">
          <a href="https://www.facebook.com/McLaren.Racing" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com/McLarenF1" target="_blank" rel="noopener noreferrer">X</a>
          <a href="https://www.instagram.com/mclaren/" target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href="https://www.youtube.com/user/OfficialMcLarenVids" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2025 McLaren Racing Limited</p>
      </div>
    </footer>
  );
}
