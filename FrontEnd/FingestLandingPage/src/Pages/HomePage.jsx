import React from 'react';
import DownButton from '../components/DownButton';
import '../../public/css/home.css'

function Home() {
    return (
        <>
            <section className='Background-Image-Home'>
            <h1 className='HomeTitle'>
                ANTICIPAMOS RIESGOS, 
            </h1>
            <h1 className='HomeTitle2'>Aseguramos tu inversión.</h1>
            <div className="overlay">
            </div> {/* Overlay div */}
            </section> 
            <DownButton/>
        </>
    );
}

export default Home;
