"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentController_1 = require("../controllers/AppointmentController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Asegúrate de importar el middleware
const router = (0, express_1.Router)();
// Rutas protegidas por el middleware de autenticación
router.get("/getDatesandTime", AppointmentController_1.getAvailableDatesAndTimes);
router.get("/getAppointments", authMiddleware_1.authMiddleware, AppointmentController_1.getAppointments);
router.post("/createAppointment", AppointmentController_1.createAppointment);
router.delete("/deleteAppointment/:id", authMiddleware_1.authMiddleware, AppointmentController_1.deleteAppointment);
exports.default = router;
