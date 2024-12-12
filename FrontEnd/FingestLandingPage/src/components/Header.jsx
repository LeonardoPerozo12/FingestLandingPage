import React from 'react';
import logoImage from '../assets/FingestLogo - Landscape.svg';
import { Link } from 'react-router-dom';
import './../../css/header.css'; 

function Header({ 
    onServiciosClick, 
    onNosotrosClick,
}) {
    return (
        <header className="header">
            <div className="header-contents">
                <h1 className="header-title">
                <Link to='/' className='nav-link'>
                    <img
                        src={logoImage} // Usamos la importación aquí
                        alt="Logo Fingest"
                        className="logo"
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    />
                </Link>
                </h1>
                <nav className="nav">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link to='/agendar-cita' className='nav-link'>
                                Agendar Cita
                            </Link>
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
            </div>
        </header>
    );
}

export default Header;
