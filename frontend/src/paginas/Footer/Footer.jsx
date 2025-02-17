import React from 'react';
import './Footer.css';

export default function FooterComponent() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <img src="https://www.mclaren.com/racing/assets/images/global/mclaren-logo.svg" alt="McLaren Logo" />
        </div>
        <div className="footer-links">
          <a href="https://www.mclaren.com/racing/">Home</a>
          <a href="https://www.mclaren.com/racing/our-cars/">Our Cars</a>
          <a href="https://www.mclaren.com/racing/partners/">Partners</a>
          <a href="https://www.mclaren.com/racing/contact/">Contact</a>
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
