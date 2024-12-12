import React, { useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Footer from './components/Footer';
import Header from './components/Header';
import RouterConfig from './RouterConfig';

function App() {
    const homeRef = useRef(null);
    const serviciosRef = useRef(null);
    const nosotrosRef = useRef(null);

    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true,
        });
    }, []);

    const scrollToSection = (elementRef) => {
        if (!elementRef.current) return;

        const headerOffset = 80; // Ajustar según la altura de tu header
        const elementPosition = elementRef.current.offsetTop;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        });
    };

    return (
        <>
            <Header
                onHomeClick={() => scrollToSection(homeRef)}
                onServiciosClick={() => scrollToSection(serviciosRef)}
                onNosotrosClick={() => scrollToSection(nosotrosRef)}
            />
            <RouterConfig
                homeRef={homeRef}
                serviciosRef={serviciosRef}
                nosotrosRef={nosotrosRef}
            />
            <Footer />
        </>
    );
}

export default App;
