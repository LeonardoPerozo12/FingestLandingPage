"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const authMiddleware_1 = require("../middleware/authMiddleware"); // Asegúrate de importar el middleware
const router = (0, express_1.Router)();
// Define las rutas
router.post("/register", UserController_1.registerUser);
router.get("/getUsers", authMiddleware_1.authMiddleware, UserController_1.getUsers);
router.post("/login", UserController_1.loginUser);
exports.default = router;
