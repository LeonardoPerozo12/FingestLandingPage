import React, { useEffect, useRef, useState } from 'react';
import Cards from './Cards'; // Tu componente de tarjetas
import '../../public/css/Carousel.css';

const Carousel = () => {
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null); // Usar useRef para guardar el intervalo
    const [isPaused, setIsPaused] = useState(false);

    const cardsData = [
        { title: 'Primera Tarjeta', content: 'Contenido de la primera tarjeta.' },
        { title: 'Segunda Tarjeta', content: 'Contenido de la segunda tarjeta.' },
        { title: 'Tercera Tarjeta', content: 'Contenido de la tercera tarjeta.' },
    ];

    // Duplicar las tarjetas para efecto infinito
    const duplicatedCards = [...cardsData, ...cardsData];

    useEffect(() => {
        const carousel = carouselRef.current;

        const startInfiniteScroll = () => {
            scrollIntervalRef.current = setInterval(() => {
                if (carousel) {
                    const maxScrollLeft = carousel.scrollWidth - carousel.clientWidth; // El total de desplazamiento permitido
                    if (carousel.scrollLeft >= maxScrollLeft) {
                        carousel.scrollLeft = 0; // Reiniciar cuando llega al final
                    } else {
                        carousel.scrollLeft += 2; // Avance suave
                    }
                }
            }, 16); // Aproximadamente 60fps
        };

        // Si el carrusel está en pausa, detén el desplazamiento
        if (isPaused) {
            clearInterval(scrollIntervalRef.current); // Detener el intervalo cuando está pausado
        } else {
            startInfiniteScroll(); // Iniciar el intervalo si no está pausado
        }

        // Limpia el intervalo cuando el componente se desmonta o se pausa
        return () => clearInterval(scrollIntervalRef.current);

    }, [isPaused]); // Solo dependemos de isPaused

    // Función para manejar la pausa
    const handlePause = () => {
        setIsPaused(true); // Pausar el carrusel
    };

    // Función para manejar la reanudación
    const handleResume = () => {
        setIsPaused(false); // Reanudar el carrusel
    };

    return (
        <div className="carousel-container" ref={carouselRef}>
            <div 
                className="carousel-row" 
                onMouseEnter={handlePause} // Pausar cuando el mouse entra
                onMouseLeave={handleResume} // Reanudar cuando el mouse sale
            >
                {duplicatedCards.map((card, index) => (
                    <div className="carousel-item" key={index}>
                        <Cards title={card.title} content={card.content} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
