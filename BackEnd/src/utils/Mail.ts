import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { EventEmitter } from "events";

const eventEmitter = new EventEmitter();
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

eventEmitter.on("sendAppointmentEmail", async(appointmentDetails) => {

    const { email, name, appointment_date, appointment_time } = appointmentDetails;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email, 
        subject: "Cita programada",
        text: `Hola ${name},\n\nTu cita ha sido programada para el día ${appointment_date} a las ${appointment_time}.\n\nGracias por confiar en nosotros.`,   
    }

    try{
        await transporter.sendMail(mailOptions);
        console.log(`Correo enviado a ${email}`);
    }
    catch(error){
        console.error(error);
    }
});

export default eventEmitter;

