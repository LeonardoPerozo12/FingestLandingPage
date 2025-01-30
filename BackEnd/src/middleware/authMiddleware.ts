import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        res
            .status(401)
            .set('WWW-Authenticate', 'Bearer')
            .json({ message: 'No token provided' });
            return;
    }

    const token = authHeader.split(' ')[1];  // El token está en el segundo valor del Authorization header (Bearer <token>)
    if (!token) {
        res.status(401).json({ message: 'Denied Access | Acceso denegado' });
        return;
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET as string);
        next();  // Llama al siguiente middleware o controlador
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};
