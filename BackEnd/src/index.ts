import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";

const app = express();
const port = 8000;

// CROSS ORIGIN RESOURCE SHARING configuration
app.use(cors({ 
    origin: "http://localhost:5173", // Permitir peticiones desde el frontend
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON requests
app.use("/api", userRoutes);
app.use("/api", appointmentRoutes);

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
