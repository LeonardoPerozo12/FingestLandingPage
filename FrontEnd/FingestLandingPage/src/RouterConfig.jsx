import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage"; // Asegúrate de que el path sea correcto

// Configuración del enrutamiento
const RouterConfig = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} /> {/* Ruta para Home */}
        </Routes>
    );
};

export default RouterConfig;
