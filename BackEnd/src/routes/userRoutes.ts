import { Router } from "express";
import { getUsers, registerUser, loginUser } from "../controllers/UserController";
import { authMiddleware } from "../middleware/authMiddleware";  // Asegúrate de importar el middleware


const router = Router();

// Define las rutas
router.post("/register", registerUser);
router.get("/getUsers", authMiddleware, getUsers);
router.post("/login", loginUser);

export default router;
