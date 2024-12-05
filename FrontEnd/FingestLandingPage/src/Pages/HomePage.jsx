import React, { forwardRef } from 'react';
import 'aos/dist/aos.css';
import '../../public/css/home.css';

const Home = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="Background-Image-Home">
            <h1 className="HomeTitle" data-aos="fade-right">
                ANTICIPAMOS RIESGOS,
            </h1>
            <h1 className="HomeTitle2" data-aos="fade-left" data-aos-delay="300">
                Aseguramos tu inversión.
            </h1>
            <div className="overlay"></div>
        </section>
    );
});

export default Home;