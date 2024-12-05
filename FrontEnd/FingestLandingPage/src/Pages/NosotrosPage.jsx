import React, { forwardRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../public/css/nosotros.css";

const Nosotros = forwardRef((props, ref) => {
useEffect(() => {
    AOS.init({
	duration: 1200,
	once: false,
	mirror: true,
    });
}, []);

return (
    <section ref={ref} className="Nosotros">
    <span id="NosotrosTitleFringe">
        <h1 id="NosotrosTitle" data-aos="fade-down">
        {" "}
        ¿Quiénes Somos?
        </h1>
    </span>
    <p id="NosotrosContent" data-aos="fade-right" data-aos-delay="200">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
	</p>

	<div className="counter-section">
        <div className="counter-container">
		<div className="counter-item">
            <h1 className="counter-value" data-aos="fade-down"  style={{ fontSize: "100px" }}>
				10
            </h1>
            <h2
				className="counter-label"
				style={{
					fontSize: "36px",
					display: "flex",
					flexDirection: "column",
					alignItems: "flex-start",
				}}
			>
				<span>Premios</span>
				<span>Ganados</span>
            </h2>
		</div>

		<div className="counter-item">
            <h1 className="counter-value" data-aos="fade-down" data-aos-delay="200" style={{ fontSize: "100px" }}>
				+100
            </h1>
            <h2 className="counter-label" style={{ fontSize: "36px" }}>
				Clientes <br />
				Satisfechos
            </h2>
		</div>
        </div>
        <div className="image-container">
			<h1 style={{ textAlign: "center" }}>Imagine this is an image</h1>
        </div>
	</div>
    </section>
);
});

export default Nosotros;
