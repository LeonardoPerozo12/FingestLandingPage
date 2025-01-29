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
exports.checkAvailability = void 0;
const prisma_1 = __importDefault(require("../prisma"));
/**
 * Checks if a specific date and time is available for an appointment.
 * @param {string} appointment_date - The date of the appointment (YYYY-MM-DD).
 * @param {string} appointment_time - The time of the appointment (HH:MM).
 * @returns {boolean} - True if the appointment is available, false otherwise.
 */
const checkAvailability = (appointment_date, appointment_time) => __awaiter(void 0, void 0, void 0, function* () {
    const requestedDate = new Date(`${appointment_date}T${appointment_time}:00`);
    const overlappingAppointments = yield prisma_1.default.appointment.findMany({
        where: {
            appointment_date: requestedDate
        }
    });
    return overlappingAppointments.length === 0; // Available if no overlapping appointments.
});
exports.checkAvailability = checkAvailability;
