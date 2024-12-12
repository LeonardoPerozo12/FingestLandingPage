import React, { forwardRef } from 'react';
import Cards from '../components/Cards';
import Carousel from '../components/Carousel';
import 'aos/dist/aos.css';
import '../../css/servicios.css';

const Servicios = forwardRef((props, ref) => {
    const tarjetas = [
        <Cards title="Primera Tarjeta" content="Este es el contenido de la primera tarjeta." />,
        <Cards title="Segunda Tarjeta" content="Este es el contenido de la segunda tarjeta." />,
        <Cards title="Tercera Tarjeta" content="Este es el contenido de la tercera tarjeta." />,
    ];

    return (
        <section ref={ref} className='Servicios'>
            <h1 id="ServiciosTitle" data-aos="fade-down">
                Te ofrecemos las mejores soluciones para gestionar riesgos en tus inversiones financieras.
            </h1>
            <div id="CardsCarousel">
                <Carousel items={tarjetas} interval={4000} />
            </div>
        </section>
    );
});

export default Servicios;