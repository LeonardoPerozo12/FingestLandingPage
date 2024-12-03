import React, { useEffect } from 'react';
import Header from './Components/Header';
import Home from './Pages/HomePage';
import Servicios from './Pages/ServiciosPage';
import Nosotros from './Pages/NosotrosPage';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
    useEffect(() => {
        AOS.init({
            duration: 1200, // Duración de las animaciones
            once: false,     // Las animaciones se ejecutan solo una vez
            mirror: true,  // Evita repetir la animación al hacer scroll hacia arriba
        });
    }, []); // Solo se ejecuta una vez al montar el componente

    return (
        <div>
            <Header />
            <Home />
            <Servicios />
            <Nosotros/>
        </div>
    );
}

export default App;
