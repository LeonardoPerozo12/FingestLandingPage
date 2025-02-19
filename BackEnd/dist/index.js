"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const appointmentRoutes_1 = __importDefault(require("./routes/appointmentRoutes"));
const app = (0, express_1.default)();
const port = 8000;
// CROSS ORIGIN RESOURCE SHARING configuration
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Permitir peticiones desde el frontend
    credentials: true,
}));
app.use(express_1.default.json()); // Middleware to parse JSON requests
app.use("/api", userRoutes_1.default);
app.use("/api", appointmentRoutes_1.default);
app.get("/", (req, res) => {
    res.send("<h1>API de Fingest<h1>");
});
app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});
// Log incoming requests
app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url} - ${new Date().toISOString()}`);
    next();
});
