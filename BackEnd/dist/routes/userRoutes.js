"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = require("../controllers/UserController");
const router = (0, express_1.Router)();
// Define las rutas
router.post("/register", UserController_1.registerUser);
router.get("/getUsers", UserController_1.getUsers);
router.post("/login", UserController_1.loginUser);
exports.default = router;
