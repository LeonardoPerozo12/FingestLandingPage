import React, { useState } from "react";
import "aos/dist/aos.css";
import "../../css/agendarCita.css";
import Calendar from "../components/Calendar";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND;

function AgendarCita() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone_number: "",
        appointment_date: "",
        appointment_time: "",
        reason_for_appointment: "",
        appointment_mode: false,
    });
    const [availableDates, setAvailableDates] = useState([]);

    const clearForm = () => {
        setFormData({
            name: "",
            email: "",
            phone_number: "",
            appointment_date: "",
            appointment_time: "",
            reason_for_appointment: "",
            appointment_mode: false,
        });
    };
    const formatPhoneNumber = (phoneNumber) => {
        const cleaned = ('' + phoneNumber).replace(/\D/g, ''); // Elimina todo lo que no sea número
        const match = cleaned.match(/^(\d{1})?(\d{3})(\d{4})(\d{4})?$/);
    
        if (match) {
            if (match[1]) {
                // Formato con código de país: 1-829-830-3510
                return `${match[1]}-${match[2]}-${match[3]}-${match[4]}`;
            } else {
                // Formato sin código de país: 829-3830-3510
                return `${match[2]}-${match[3]}-${match[4]}`;
            }
        }
        console.log(phoneNumber);
        return phoneNumber; // Si no coincide con el formato esperado, retorna el original
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Parse boolean values from str to bool
        let parsedValue = value;
        if (value === "true" || value === "false") {
            parsedValue = value === "true";
        }

        // Set the form data and make sure boolean values are parsed correctly
        setFormData({
            ...formData,
            [name]: parsedValue,
        });
    };

    const handleDateChange = (date) => {
        setFormData({ ...formData, appointment_date: date });
    };

    const handleTimeChange = (e) => {
        const { value } = e.target;
        setFormData({ ...formData, appointment_time: value });
    };

    const handleAvailableDatesChange = (dates) => {
        setAvailableDates(dates);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the phone number before submitting
        const formattedPhoneNumber = formatPhoneNumber(formData.phone_number);
        const updatedFormData = { ...formData, phone_number: formattedPhoneNumber };

        // Validar la hora seleccionada
        const selectedDateObj = availableDates.find(
            (availableDate) =>
                availableDate.date.getFullYear() === updatedFormData.appointment_date.getFullYear() &&
                availableDate.date.getMonth() === updatedFormData.appointment_date.getMonth() &&
                availableDate.date.getDate() === updatedFormData.appointment_date.getDate()
        );

        if (selectedDateObj) {
            const selectedTime = new Date(`1970-01-01T${updatedFormData.appointment_time}:00`);
            const isSlotAvailable = selectedDateObj.slots.some(slot =>
                slot.getHours() === selectedTime.getHours() && slot.getMinutes() === selectedTime.getMinutes()
            );

            if (!isSlotAvailable) {
                toast.error("La hora seleccionada ya está ocupada.");
                return;
            }
        }

        axios.post(`${BASE_URL}/api/createAppointment/`, updatedFormData)
            .then((response) => {
                if (response.status === 201) { // Asegúrate de que el estado es 201 (Created)
                    toast.success("¡Cita agendada exitosamente!");
                    clearForm();
                } else {
                    toast.error("No se pudo agendar la cita. Por favor, intenta más tarde.");
                }
            })
            .catch((error) => {
                console.error("Error al agendar cita:", error);
                toast.error("No se pudo agendar la cita. Por favor, intenta más tarde.");
            });
    };

    return (
        <div className="containerBG">
            <div className="formContainer">
                <form onSubmit={handleSubmit} className="form">
                    <div className="formControllers">
                        <div className="personalInfoContainer">
                            {/* Información Personal */}
                            <h2 className="formTitle">Ingrese su información personal:</h2>
                            <div className="inputsContainer">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre y Apellido"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                                <input
                                    type="tel"
                                    name="phone_number"
                                    placeholder="Número de teléfono"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Correo Electrónico"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                />
                                <select
                                    name="appointment_mode"
                                    value={formData.appointment_mode}
                                    onChange={handleChange}
                                    className="input"
                                    required
                                >
                                    <option value="" disabled>Seleccione la modalidad</option>
                                    <option value="true">Presencial</option>
                                    <option value="false">Virtual</option>
                                </select>
                            </div>
                        </div>
                        <div className="CalendarContainer">
                            <h2 className="formTitle">Seleccione dia y hora:</h2>
                            {/* Contenedor izquierdo con los inputs apilados */}
                            <div className="CalendarFormContainer">
                                <div className="leftInputsContainer">
                                    <input
                                        type="time"
                                        name="appointment_time"
                                        value={formData.appointment_time}
                                        onChange={handleTimeChange}
                                        className="input"
                                        required
                                        style={{ width: "100%" }}
                                    />
                                    <input
                                        type="text"
                                        name="reason_for_appointment"
                                        placeholder="Motivo de la cita"
                                        value={formData.reason_for_appointment}
                                        onChange={handleChange}
                                        className="input"
                                        required
                                        style={{ width: "100%" }}
                                    />
                                </div>
                                <Calendar
                                    className="calendar"
                                    selectedDate={formData.appointment_date}
                                    onDateChange={handleDateChange}
                                    onAvailableDatesChange={handleAvailableDatesChange}
                                />
                            </div>
                        </div>
                    </div>
                    {/* Botones de acción */}
                    <div className="buttonSection">
                        <button type="submit" className="submitButton">
                            Agendar Cita
                        </button>
                        <button type="button" className="clearButton" onClick={clearForm}>
                            Limpiar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AgendarCita;