import express, { Router } from "express";
import userRoutes from "./routes/userRoutes";
import appointmentRoutes from "./routes/appointmentRoutes"

const app = express();
const port = 8000;

app.use(express.json()); // Middleware to parse JSON requests
app.use("/api", userRoutes);
app.use("/api", appointmentRoutes);

app.listen(port, () => {
    console.log(`Now listening on port http://localhost:${port}`);
});

