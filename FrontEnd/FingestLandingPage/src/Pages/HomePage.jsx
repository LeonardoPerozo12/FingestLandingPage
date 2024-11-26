import React from 'react';
import { useEffect } from 'react';
import DownButton from '../components/DownButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../public/css/home.css';

function Home() {
    useEffect(() => {
        AOS.init({
            duration: 1200, // Duración en milisegundos
            once: false,    // Permitir múltiples ejecuciones
            mirror: true,   // Ejecutar al hacer scroll hacia arriba
        });
        console.log("AOS initialized");
    }, []);

    return (
        <>
            <section className="Background-Image-Home">
                <h1 className="HomeTitle" data-aos="fade-right">
                    ANTICIPAMOS RIESGOS,
                </h1>
                <h1 className="HomeTitle2" data-aos="fade-left" data-aos-delay="300">
                    Aseguramos tu inversión.
                </h1>
                <div className="overlay"></div>
            </section>
            <DownButton />
        </>
    );
}

export default Home;
