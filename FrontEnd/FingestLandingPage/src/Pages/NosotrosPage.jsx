import React from "react";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../public/css/nosotros.css";

function Nosotros() {
    useEffect(() => {
    AOS.init({
        duration: 1200,
        once: false,
        mirror: true,
    });
        }, []);
    return (
    <section id="Nosotros">
        <h1 id="NosotrosTitle">¿Quiénes Somos?</h1>
        <p id='NosotrosContent'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
        </p>
        <div id="NosotrosContent2">
            
        </div>
    </section>
    );
}

export default Nosotros;
