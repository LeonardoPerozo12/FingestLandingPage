import React, { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './components/Header';
import Home from './Pages/HomePage';
import Servicios from './Pages/ServiciosPage';
import Nosotros from './Pages/NosotrosPage';

function App() {
    const homeRef = useRef(null);
    const serviciosRef = useRef(null);
    const nosotrosRef = useRef(null);
    const agendarCitaRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true,
        });
    }, []);

    const scrollToSection = (elementRef) => {
        if (!elementRef.current) return;
        
        const headerOffset = 80; // adjust based on your header height
        const elementPosition = elementRef.current.offsetTop;
        const offsetPosition = elementPosition - headerOffset;
    
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    };
    return (
        <div>
            <Header 
                onHomeClick={() => scrollToSection(homeRef)}
                onServiciosClick={() => scrollToSection(serviciosRef)}
                onNosotrosClick={() => scrollToSection(nosotrosRef)}
                onAgendarCitaClick={() => scrollToSection(agendarCitaRef)}
            />
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
        </div>
    );
}

export default App;
