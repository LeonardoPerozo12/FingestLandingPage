import React, { useEffect, useRef, useState } from 'react';
import Cards from './Cards'; // Tu componente de tarjetas
import '../../css/carousel.css';

const Carousel = () => {
    const carouselRef = useRef(null);
    const scrollIntervalRef = useRef(null);
    const [isPaused, setIsPaused] = useState(false);

    const cardsData = [
        { title: 'Primera Tarjeta', content: 'Contenido de la primera tarjeta.' },
        { title: 'Segunda Tarjeta', content: 'Contenido de la segunda tarjeta.' },
        { title: 'Tercera Tarjeta', content: 'Contenido de la tercera tarjeta.' },
        { title: 'Cuarta Tarjeta', content: 'Contenido de la cuarta tarjeta.' },
        { title: 'Quinta Tarjeta', content: 'Contenido de la quinta tarjeta.' },
    ];

    // Crear un arreglo duplicado para el efecto de bucle
    const duplicatedCards = [...cardsData, ...cardsData];

    useEffect(() => {
        const carousel = carouselRef.current;

        const startInfiniteScroll = () => {
            scrollIntervalRef.current = setInterval(() => {
                if (carousel) {
                    // Desplazarse automáticamente
                    carousel.scrollLeft += 2;

                    // Reiniciar suavemente cuando alcance la mitad
                    if (carousel.scrollLeft >= carousel.scrollWidth / 2) {
                        carousel.scrollLeft = 0; // Reinicia el scroll
                    }
                }
            }, 24); // Aproximadamente 60fps
        };

        if (!isPaused) {
            startInfiniteScroll(); // Inicia el scroll automático
        }

        return () => clearInterval(scrollIntervalRef.current); // Limpia el intervalo al desmontar
    }, [isPaused]);

    const handlePause = () => {
        setIsPaused(true);
        clearInterval(scrollIntervalRef.current); // Detener el intervalo
    };

    const handleResume = () => {
        setIsPaused(false);
    };

    return (
        <div className="CardsCarousel-container" ref={carouselRef}>
            <div
                className="CardsCarousel-row"
                onMouseEnter={handlePause}
                onMouseLeave={handleResume}
            >
                {duplicatedCards.map((card, index) => (
                    <div className="CardsCarousel-item" key={index}>
                        <Cards title={card.title} content={card.content} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Carousel;
