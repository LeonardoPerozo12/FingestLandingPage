import React from 'react';
import { useEffect } from 'react';
import Cards from '../components/ServicesCards';
import DownButton from '../components/DownButton';
import '../../public/css/servicios.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


function Servicios() {
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
            <section id='Servicios' >
                <h1 id='ServiciosTitle' data-aos="fade-down">
                Te ofrecemos las mejores soluciones para gestionar riesgos en tus inversiones financieras.
                </h1>   
            <div id='CardsCarousel'>
                <Cards 
                title="Primera Tarjeta" 
                content="Este es el contenido de la primera tarjeta." 
                />
                <Cards 
                title="Segunda Tarjeta" 
                content="Este es el contenido de la segunda tarjeta." 
                />
            </div>
            </section> 
            <DownButton/>
        </>
    );
}

export default Servicios;
