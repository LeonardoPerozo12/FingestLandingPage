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
exports.getUsers = exports.loginUser = exports.registerUser = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, UserName } = req.body; //parsing from the request body
        const existingUser = yield prisma_1.default.user.findUnique({ where: { email } }); //checks that user exists
        if (existingUser) {
            res.status(400).json({ message: "Email already in use | Este correo esta en uso" });
            return;
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10); //hashes password and stores it in a new variable
        const user = yield prisma_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
                UserName,
            },
        });
        res.status(201).json({ message: "User registered successfully | Usuario registrado con exito", user });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        // Find the user by email
        const user = yield prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password | Contraseña o Correo inválidos" });
            return; // Add return to stop further execution
        }
        // Compare the provided password with the hashed password
        const isPasswordValid = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(400).json({ message: "Invalid email or password | Contraseña o Correo inválidos" });
            return; // Add return to stop further execution
        }
        // Ensure JWT_SECRET is defined
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            res.status(500).json({ message: "JWT_SECRET is not defined in environment variables" });
            return; // Add return to stop further execution
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.user_id }, secret, { expiresIn: '1h' });
        res.json({ message: "Login successful | Inicio de sesión exitoso", token });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error | Error del servidor", error });
    }
});
exports.loginUser = loginUser;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //find all users from table users
        const users = yield prisma_1.default.user.findMany();
        res.json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error fetching Users | Error buscando Los usuarios",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
});
exports.getUsers = getUsers;
