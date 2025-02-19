import prisma from "../prisma";

/**
 * Checks if a specific date and time is available for an appointment.
 * @param {string} appointment_date - The date of the appointment (YYYY-MM-DD).
 * @param {string} appointment_time - The time of the appointment (HH:MM).
 * @returns {boolean} - True if the appointment is available, false otherwise.
 */
export const checkAvailability = async (appointment_date: string, appointment_time: string) => {
    if (!appointment_date || !appointment_time) {
        throw new Error("Fecha u hora no proporcionadas correctamente");
    }

    const formattedDate = appointment_date.split("T")[0]; // Asegura el formato YYYY-MM-DD
    const requestedDate = new Date(`${formattedDate}T${appointment_time}:00`);

    if (isNaN(requestedDate.getTime())) {
        throw new Error(`Fecha inválida: ${formattedDate} ${appointment_time}`);
    }

    const overlappingAppointments = await prisma.appointment.findMany({
        where: {
            appointment_date: requestedDate,
        },
    });

    return overlappingAppointments;
};

