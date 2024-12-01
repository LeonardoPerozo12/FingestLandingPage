import React from 'react';
import { useEffect } from 'react';
import DownButton from '../components/DownButton';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../../public/css/home.css';

function Home() {
    useEffect(() => {
        AOS.init({
            debounceDelay: 50, 
            once: false, // whether animation should happen only once - while scrolling down
            mirror: true,
        });
        console.log("AOS initialized");
    }, []);

    return (
        <>
            <section className="Background-Image-Home">
                <h1 className="HomeTitle" data-aos="fade-right"  data-aos-mirror="true">
                    ANTICIPAMOS RIESGOS,
                </h1>
                <h1 className="HomeTitle2" data-aos="fade-left" data-aos-delay="300"  data-aos-mirror="true">
                    Aseguramos tu inversión.
                </h1>
                <div className="overlay"></div>
            </section>
            <DownButton />
        </>
    );
}

export default Home;
