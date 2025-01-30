import { Router } from "express";
import { getAvailableDatesAndTimes, createAppointment, deleteAppointment, getAppointments} from "../controllers/AppointmentController";

const router = Router();

// Define las rutas
router.get("/getDatesandTime", getAvailableDatesAndTimes);
router.get("/getAppointments", getAppointments);
router.post("/createAppointment", createAppointment);
router.delete("/deleteAppointment/:id", deleteAppointment);


export default router