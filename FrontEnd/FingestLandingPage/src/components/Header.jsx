import React from 'react';
import logoImage from './../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg';
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
                    src="./../../public/LOGO FINGEST RISK CONSULTAN-01 2 (1).jpg"
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
