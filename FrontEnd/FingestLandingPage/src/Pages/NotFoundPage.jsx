import React from "react";
import { Link } from "react-router-dom";
import "../../css/NotFoundPage.css";

export function NotFoundPage() {
    return (
        <div className="not-found-container">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Oops! Página no encontrada</h2>
                <p className="not-found-text">
                    Parece que te perdiste. No te preocupes, puedes regresar a la página principal.
                </p>
                <Link to="/" className="not-found-button">Volver al Inicio</Link>
            </div>
        </div>
    );
}
