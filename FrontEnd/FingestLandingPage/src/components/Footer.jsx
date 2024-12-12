import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../assets/FingestLogo - Vertical.svg'; 
import '../../css/footer.css';

function Footer() {
    return (
    <footer className="footer">
        <div className="footer-content">
        <img 
            src={logoImage}
            alt="Logo Fingest"
            className="footer-logo"
        />
        <ul className="footer-links">
        <li className="footer-link-item">
            <Link to="/about" className="footer-link">Contactanos: example@gmail.com</Link>
        </li>
        <li className="footer-link-item">
            <Link to="/privacy" className="footer-link">Preguntas Frecuentes</Link>
        </li>
        <li className="footer-link-item">
            <Link to="/contact" className="footer-link">Copyright © 2024 Example.com. All Rights Reserved.</Link>
            </li>
        </ul>
        </div>
    </footer>
    );
}

export default Footer;
