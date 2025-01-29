"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableDatesAndTimes = exports.createAppointment = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const createAppointment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extraemos los datos del cuerpo de la solicitud
        const { name, email, phone_number, appointment_date, appointment_time, reason_for_appointment, appointment_mode } = req.body;
        // Verificar que todos los campos necesarios estén presentes
        if (!name || !email || !appointment_date || !appointment_time || !reason_for_appointment || appointment_mode === undefined) {
            res.status(400).json({ message: "Faltan campos requeridos" });
            return;
        }
        // Verifica si el cliente ya existe por su email
        let customer = yield prisma_1.default.customer.findUnique({
            where: { email }
        });
        // Si el cliente no existe, crearlo
        if (!customer) {
            customer = yield prisma_1.default.customer.create({
                data: {
                    name,
                    email,
                    phone_number, // Si el número de teléfono no se proporciona, será `null` automáticamente
                }
            });
        }
        // Crear la cita en la base de datos
        const appointment = yield prisma_1.default.appointment.create({
            data: {
                reason_for_appointment,
                appointment_mode,
                appointment_date: new Date(appointment_date), // Asegúrate de que sea un objeto Date
                appointment_time: new Date(`1970-01-01T${appointment_time}:00Z`), // Crear el objeto Date con solo la hora
                customer_id: customer.customer_id, // Relacionar la cita con el cliente
            }
        });
        // Formatear la fecha y hora antes de responder
        const formattedDate = new Date(appointment.appointment_date).toISOString().split('T')[0]; // Solo la fecha (YYYY-MM-DD)
        const formattedTime = new Date(appointment.appointment_time).toISOString().split('T')[1].slice(0, 5); // Solo la hora (HH:mm)
        // Responder con la cita creada
        res.status(201).json({
            message: "Cita creada exitosamente",
            appointment: Object.assign(Object.assign({}, appointment), { appointment_date: formattedDate, appointment_time: formattedTime })
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error al crear la cita", error });
    }
});
exports.createAppointment = createAppointment;
//Devuelve todas las fechas y horas libres para las citas, combinadas como un solo campo.
const getAvailableDatesAndTimes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Definir el rango de fechas que deseas consultar (por ejemplo, el próximo mes)
        const startDate = new Date();
        const endDate = new Date();
        endDate.setMonth(startDate.getMonth() + 1); // Busca disponibilidad para el próximo mes
        // Obtener todas las citas que ya están ocupadas
        const appointments = yield prisma_1.default.appointment.findMany({
            where: {
                appointment_date: {
                    gte: startDate, //greater than or equal to
                    lte: endDate //less than or equal to
                }
            },
            select: {
                appointment_date: true, // Solo obtener las fechas de las citas
                appointment_time: true // Y las horas de las citas
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
            }
            else {
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
    }
    catch (error) {
        res.status(500).json({ message: "Error retrieving available dates and times", error });
    }
});
exports.getAvailableDatesAndTimes = getAvailableDatesAndTimes;
