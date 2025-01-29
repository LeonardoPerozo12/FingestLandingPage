import { Router } from "express";
import { getUsers, registerUser, loginUser } from "../controllers/UserController";

const router = Router();

// Define las rutas
router.post("/register", registerUser);
router.get("/getUsers", getUsers);
router.post("/login", loginUser);

export default router;
