import { Router } from "express";
import { getAvailableDatesAndTimes, createAppointment, deleteAppointment, getAppointments } from "../controllers/AppointmentController";
import { authMiddleware } from "../middleware/authMiddleware";  // Asegúrate de importar el middleware

const router = Router();

// Rutas protegidas por el middleware de autenticación
router.get("/getDatesandTime", getAvailableDatesAndTimes);
router.get("/getAppointments", authMiddleware, getAppointments);
router.post("/createAppointment", createAppointment);
router.delete("/deleteAppointment/:id", authMiddleware, deleteAppointment);

export default router;
