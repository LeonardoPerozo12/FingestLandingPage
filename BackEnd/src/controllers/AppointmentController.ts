import prisma from "../prisma";
import { Request, Response } from "express";
import {checkAvailability} from '../utils/availability'


export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { name, email, phone_number, appointment_date, appointment_time, reason_for_appointment, appointment_mode } = req.body;

        // Verificar que todos los campos necesarios estén presentes
        if (!name || !email || !appointment_date || !appointment_time || !reason_for_appointment || appointment_mode === undefined) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }

        // Verifica si el cliente ya existe por su email
        let customer = await prisma.customer.findUnique({
            where: { email }
        });

        // Si el cliente no existe, crearlo
        if (!customer) {
            customer = await prisma.customer.create({
                data: {
                    name,
                    email,
                    phone_number,  // Si el número de teléfono no se proporciona, será `null` automáticamente
                }
            });
        }

        // Crear la cita en la base de datos
        const appointment = await prisma.appointment.create({
            data: {
                reason_for_appointment,
                appointment_mode,
                appointment_date: new Date(appointment_date),  // Asegúrate de que sea un objeto Date
                appointment_time: new Date(`1970-01-01T${appointment_time}:00Z`),  // Crear el objeto Date con solo la hora
                customer_id: customer.customer_id,  // Relacionar la cita con el cliente
            }
        });

        // Formatear la fecha y hora antes de responder
        const formattedDate = new Date(appointment.appointment_date).toISOString().split('T')[0];  // Solo la fecha (YYYY-MM-DD)
        const formattedTime = new Date(appointment.appointment_time).toISOString().split('T')[1].slice(0, 5);  // Solo la hora (HH:mm)

        // Responder con la cita creada
        res.status(201).json({
            message: "Cita creada exitosamente",
            appointment: {
                ...appointment,
                appointment_date: formattedDate,
                appointment_time: formattedTime
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la cita", error });
    }
};

//Devuelve todas las fechas y horas libres para las citas, combinadas como un solo campo.
export const getAvailableDatesAndTimes = async (req: Request, res: Response): Promise<void> => {
    try {
        // Definir el rango de fechas que deseas consultar (por ejemplo, el próximo mes)
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1); // Busca disponibilidad para el próximo mes

        // Obtener todas las citas que ya están ocupadas
        const appointments = await prisma.appointment.findMany({
            where: {
                appointment_date: {
                    gte: startDate, //greater than or equal to
                    lte: endDate //less than or equal to
                }
            },
            select: {
                appointment_date: true, // Solo obtener las fechas de las citas
                appointment_time: true  // Y las horas de las citas
            }
        });

        // Crear una lista con todas las fechas ocupadas
        const bookedDates = appointments.map(appointment => appointment.appointment_date.toISOString().split('T')[0]);

        // Generar todas las fechas posibles dentro del rango y combinarlas con las horas disponibles
        const availableDates = [];

        // Definir todas las horas posibles para cada día (por ejemplo, de 9:00 AM a 5:00 PM)
        const allTimes = [
            '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
        ];

        // Iterar sobre las fechas dentro del rango
        for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
            const dateString = date.toISOString().split('T')[0];

            // Si la fecha no está ocupada
            if (!bookedDates.includes(dateString)) {
                availableDates.push({
                    date: dateString,
                    availableSlots: allTimes.map(time => `${dateString} ${time}`) // Combina la fecha con todas las horas disponibles
                });
            } else {
                // Si la fecha está ocupada, comprobar qué horas están libres
                const bookedTimes = appointments
                    .filter(appointment => appointment.appointment_date.toISOString().split('T')[0] === dateString)
                    .map(appointment => appointment.appointment_time.toISOString().split('T')[1].split(':')[0] + ':00');

                // Filtrar las horas ocupadas y devolver solo las disponibles
                const availableSlots = allTimes
                    .filter(time => !bookedTimes.includes(time))
                    .map(time => `${dateString} ${time}`); // Combina la fecha con las horas disponibles

                if (availableSlots.length > 0) {
                    availableDates.push({
                        date: dateString,
                        availableSlots: availableSlots
                    });
                }
            }
        }

        // Responder con las fechas y horas disponibles
        res.status(200).json({ availableDates });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving available dates and times", error });
    }
};

export const deleteAppointment = async (req : Request, res: Response): Promise<void> =>{
    try{
        

        const appointment_Id = parseInt(req.params.id, 10);

        // revisa si existe la cita
        const existingAppointment = await prisma.appointment.findUnique({

            where: {appointment_id : appointment_Id}
        });

        if(!existingAppointment){
            res.status(404).json({ error : "Appointment not found | Cita no encontrada"});
            return;
        }

        //eliminacion de la cita
        await prisma.appointment.delete({

            where : {appointment_id: appointment_Id}
        });

    res.status(200).json({ message: 'Cita eliminada correctamente' });
    
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar la cita' });
    }   
}

export const getAppointments = async(req: Request, res: Response): Promise<void> => {
    try{
        const appointments = await prisma.appointment.findMany();
        res.json(appointments);
    }
    catch(error){
        res.status(500).json({
            message: "Error fetching Users | Error buscando Los usuarios",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
}