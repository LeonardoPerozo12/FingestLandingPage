import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from './../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg'; 
import '../../public/css/footer.css';

function Footer() {
    return (
    <footer className="footer">
        <div className="footer-content">
        <h1 className="footer-logo">
        <img 
            src="./../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg"
            alt="Logo Fingest"
            className="logo"
        />

        </h1>
        <ul className="footer-links">
        <li className="footer-link-item">
            <Link to="/about" className="footer-link">Acerca de</Link>
        </li>
        <li className="footer-link-item">
            <Link to="/privacy" className="footer-link">Política de privacidad</Link>
        </li>
        <li className="footer-link-item">
            <Link to="/contact" className="footer-link">Contacto</Link>
            </li>
        </ul>
        </div>
    </footer>
    );
}

export default Footer;
