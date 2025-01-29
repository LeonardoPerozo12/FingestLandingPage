import { Router } from "express";
import { getAvailableDatesAndTimes, createAppointment} from "../controllers/AppointmentController";

const router = Router();

// Define las rutas
router.get("/getDatesandTime", getAvailableDatesAndTimes)
router.post("/createAppointment", createAppointment)


export default router