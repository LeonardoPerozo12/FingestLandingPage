import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Pages/HomePage';
import Servicios from './Pages/ServiciosPage';
import Nosotros from './Pages/NosotrosPage';
import AgendarCita from './Pages/AgendarCita';

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
        </Routes>
    );
}

export default RouterConfig;
