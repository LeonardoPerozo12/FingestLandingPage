import React from 'react';
import logoImage from './../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg';
import './../../public/css/header.css'; 

function Header({ 
    onHomeClick, 
    onServiciosClick, 
    onNosotrosClick,
    onAgendarCitaClick 
}) {
    return (
        <header className="header">
            <h1 className="header-title">
                <a href="#" onClick={(e) => { e.preventDefault(); onHomeClick(); }}>
                    <img
                        src={logoImage}
                        alt="Logo Fingest"
                        className="logo"
                    />
                </a>
            </h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item">
                        <a 
                            href="#agendar-cita" 
                            className="nav-link"
                            onClick={(e) => { e.preventDefault(); onAgendarCitaClick(); }}
                        >
                            Agendar Cita
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            href="#servicios" 
                            className="nav-link"
                            onClick={(e) => { e.preventDefault(); onServiciosClick(); }}
                        >
                            Servicios
                        </a>
                    </li>
                    <li className="nav-item">
                        <a 
                            href="#nosotros" 
                            className="nav-link"
                            onClick={(e) => { e.preventDefault(); onNosotrosClick(); }}
                        >
                            Nosotros
                        </a>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
