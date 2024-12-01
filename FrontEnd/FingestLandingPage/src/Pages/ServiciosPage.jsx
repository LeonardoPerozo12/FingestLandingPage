import React from 'react';
import { useEffect } from 'react';
import Cards from '../components/Cards';
import DownButton from '../components/DownButton';
import Carousel from '../components/Carousel'; // Importa el carrusel
import '../../public/css/servicios.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function Servicios() {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            once: false,
            mirror: true,
        });
    }, []);

    // Lista de tarjetas
    const tarjetas = [
        <Cards title="Primera " content="Este es el contenido de la primera tarjeta." />,
        <Cards title="Segunda Tarjeta" content="Este es el contenido de la segunda tarjeta." />,
        <Cards title="Tercera Tarjeta" content="Este es el contenido de la tercera tarjeta." />,
        <Cards title="Cuarta Tarjeta" content="Este es el contenido de la cuarta tarjeta." />,
    ];

    return (
        <>
            <section id="Servicios">
                <h1 id="ServiciosTitle" data-aos="fade-down">
                    Te ofrecemos las mejores soluciones para gestionar riesgos en tus inversiones financieras.
                </h1>
                <div id="CardsCarousel">
                    <Carousel items={tarjetas} interval={4000} />
                </div>
            </section>
            <DownButton />
        </>
    );
}

export default Servicios;
