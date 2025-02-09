import React from 'react';
import Home from './Pages/HomePage';
import Nosotros from './Pages/NosotrosPage';
import AgendarCita from './Pages/AgendarCita';
import Servicios from './Pages/ServiciosPage';
import { Routes, Route } from 'react-router-dom';
import { NotFoundPage } from './Pages/NotFoundPage';
import { DashboardRoutes } from './routes/dashboardRoutes';

function RouterConfig({ homeRef, serviciosRef, nosotrosRef }) {
    return (
        <Routes>
            <Route
                path="/"
                element={
                    <main>
                        <section id="Home" ref={homeRef}>
                            <Home />
                        </section>
                        <section id="Servicios" ref={serviciosRef}>
                            <Servicios />
                        </section>
                        <section id="Nosotros" ref={nosotrosRef}>
                            <Nosotros />
                        </section>
                    </main>
                }
            />
            <Route path="/agendar-cita" element={<AgendarCita />} />
            
            {/* Rutas protegidas */}
            <Route path="/dashboard/*" element={<DashboardRoutes />} />
            
            {/* 404 para rutas no definidas */}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default RouterConfig;
