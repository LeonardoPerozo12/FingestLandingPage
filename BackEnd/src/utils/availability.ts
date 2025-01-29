import prisma from "../prisma";

/**
 * Checks if a specific date and time is available for an appointment.
 * @param {string} appointment_date - The date of the appointment (YYYY-MM-DD).
 * @param {string} appointment_time - The time of the appointment (HH:MM).
 * @returns {boolean} - True if the appointment is available, false otherwise.
 */

export const checkAvailability = async (appointment_date: string, appointment_time: string): Promise<boolean> => {
    const requestedDate = new Date(`${appointment_date}T${appointment_time}:00`);
    
    const overlappingAppointments = await prisma.appointment.findMany({
        where: {
            appointment_date: requestedDate
        }
    });

    return overlappingAppointments.length === 0;  // Available if no overlapping appointments.
};
