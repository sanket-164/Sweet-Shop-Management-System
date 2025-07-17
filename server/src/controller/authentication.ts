import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "../database";
import bcrypt from "bcrypt";

export const registerUser = async (req: Request, res: Response, next: NextFunction) => {
    const { name, password, email, role } = req.body;

    if (!name || !password || !email) {
        return next(createHttpError(400, "All fields are required"));
    }

    try {
        const existingUser = await prisma.users.findUnique({
            where: { email }
        });

        if (existingUser) {
            return next(createHttpError(409, "User already exists"));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.users.create({
            data: { name, email, password: hashedPassword, role: role || 'customer' }
        });

        // Optionally exclude the password from response
        const { password: _, ...userWithoutPassword } = user;

        res.status(201).json(userWithoutPassword);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error: " + (error as Error).message));
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(createHttpError(400, "Email and password are required"));
    }

    try {
        const user = await prisma.users.findUnique({
            where: { email }
        });

        if (!user) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return next(createHttpError(401, "Invalid credentials"));
        }

        const { password: _, ...userWithoutPassword } = user;

        res.status(200).json(userWithoutPassword);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error: " + (error as Error).message));
    }
};
