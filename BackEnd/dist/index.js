"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json()); // Middleware to parse JSON requests
app.use("/api", userRoutes_1.default);
app.use("/api", appointmentRoutes_1.default);
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
