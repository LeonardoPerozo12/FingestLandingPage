import React from 'react';
import logoImage from '../assets/FingestLogo - Landscape.svg';
import './../../public/css/header.css'; 

function Header({ 
    onServiciosClick, 
    onNosotrosClick,
    onAgendarCitaClick 
}) {
    return (
        <header className="header">
            <h1 className="header-title">
                <img
                    src={logoImage} // Usamos la importación aquí
                    alt="Logo Fingest"
                    className="logo"
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
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
