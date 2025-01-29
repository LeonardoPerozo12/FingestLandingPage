"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AppointmentController_1 = require("../controllers/AppointmentController");
const router = (0, express_1.Router)();
// Define las rutas
router.get("/getDatesandTime", AppointmentController_1.getAvailableDatesAndTimes);
router.post("/createAppointment", AppointmentController_1.createAppointment);
exports.default = router;
