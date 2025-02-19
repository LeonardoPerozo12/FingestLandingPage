import prisma from "../prisma";
import bcrypt from 'bcrypt'
import { Request, Response } from "express";
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
    try{
        const { email, password, UserName } = req.body; //parsing from the request body

        const existingUser = await prisma.user.findUnique({ where: { email }}); //checks that user exists
        if(existingUser){
            res.status(400).json({ message: "Email already in use | Este correo esta en uso" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10); //hashes password and stores it in a new variable

        const user = await prisma.user.create({ //creates new user 
            data:{
                email,
                password : hashedPassword,
                UserName,
            },

        });
        res.status(201).json({ message: "User registered successfully | Usuario registrado con exito", user });
    }
    catch(error){
        res.status(500).json({ message: "Server error", error });
    }
};
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ message: "Invalid email or password | Contraseña o Correo inválidos" });
            return; // Add return to stop further execution
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
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
        const token = jwt.sign({ userId: user.user_id }, secret, { expiresIn: '12h' });

        res.json({ message: "Login successful | Inicio de sesión exitoso", token });
    } catch (error) {
        res.status(500).json({ message: "Server Error | Error del servidor", error });
    }
};


export const getUsers = async (req: Request, res: Response) => {
    try{
        //find all users from table users
        const users = await prisma.user.findMany();
        res.json(users);
    }
    catch(error){

        console.error(error);

        res.status(500).json({
            message: "Error fetching Users | Error buscando Los usuarios",
            error: error instanceof Error ? error.message : "Unknown error"
        });
    }
};