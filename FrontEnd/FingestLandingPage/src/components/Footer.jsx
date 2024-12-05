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
