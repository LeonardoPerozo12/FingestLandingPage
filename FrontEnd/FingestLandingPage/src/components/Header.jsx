import React from 'react';
import './../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg';
import './../../public/css/header.css'; 

function Header() {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
    <header className="header">
        <h1 className="header-title">
            <img
            src="./../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg"
            alt="Logo Fingest"
            className="logo"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            />
        </h1>
        <nav className="nav">
        <ul className="nav-list">
            <li className="nav-item">
            <a href="#agendar-cita" className="nav-link">Agendar Cita</a>
            </li>
            <li className="nav-item">
            <a href="#servicios" className="nav-link">Servicios</a>
            </li>
            <li className="nav-item">
            <a href="#nosotros" className="nav-link">Nosotros</a>
            </li>
        </ul>
        </nav>
    </header>
    );
}

export default Header;
