import React, { useState } from 'react';
import 'aos/dist/aos.css';
import '../../css/agendarCita.css';

function AgendarCita() {
    const [formData, setFormData] = useState({
        nombre: '',
        apellido: '',
        correo: '',
        fecha: '',
        hora: '',
    });

    const clearForm = () => {
        setFormData({
            nombre: '',
            apellido: '',
            correo: '',
            fecha: '',
            hora: '',
        });
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí puedes agregar lógica para enviar los datos al backend
    };

    return (
        <div className="container">
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="form">
                    <div className='formControllers'>
                          {/* Sección de Información Personal */}
                    <div className="inputsContainer">
                        <h2>Información Personal</h2>
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={formData.nombre}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        <input
                            type="text"
                            name="apellido"
                            placeholder="Apellido"
                            value={formData.apellido}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo Electrónico"
                            value={formData.correo}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>

                    {/* Sección de Selección de Cita */}
                    <div className="CalendarContainer">
                        <h2>Selecciona tu Cita</h2>
                        <input
                            type="date"
                            name="fecha"
                            value={formData.fecha}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                        <input
                            type="time"
                            name="hora"
                            value={formData.hora}
                            onChange={handleChange}
                            className="input"
                            required
                        />
                    </div>
                    </div>
                    <div className='buttonSection'>
                        {/* Botón de Envío */}
                        <button type="submit" className="submitButton">
                            Agendar Cita
                        </button>
                        <button type="clear" className="clearButton" onClick={clearForm}>
                            Limpiar 
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgendarCita;