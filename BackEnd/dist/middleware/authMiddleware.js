"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        res
            .status(401)
            .set('WWW-Authenticate', 'Bearer')
            .json({ message: 'No token provided' });
        return;
    }
    const token = authHeader.split(' ')[1]; // El token está en el segundo valor del Authorization header (Bearer <token>)
    if (!token) {
        res.status(401).json({ message: 'Denied Access | Acceso denegado' });
        return;
    }
    try {
        const verified = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        next(); // Llama al siguiente middleware o controlador
    }
    catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};
exports.authMiddleware = authMiddleware;
