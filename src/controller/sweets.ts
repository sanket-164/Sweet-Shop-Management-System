import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "../database";

export const getAllSweets = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const sweets = await prisma.sweet.findMany();
        res.status(200).json(sweets);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const getSweetById = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        const sweet = await prisma.sweet.findUnique({
            where: { id: Number(id) }
        });

        if (!sweet) {
            return next(createHttpError(404, "Sweet not found"));
        }

        res.status(200).json(sweet);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const addSweet = async (req: Request, res: Response, next: NextFunction) => {
    const { name, price, category, quantity } = req.body;

    if (!name || !price || !category || !quantity) {
        return next(createHttpError(400, "All fields are required"));
    }

    if(price < 0 || quantity < 0) {
        return next(createHttpError(400, "Price and quantity must be non-negative"));
    }

    try {
        const sweet = await prisma.sweet.create({
            data: { name, price, category, quantity }
        });
        res.status(201).json(sweet);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const updateSweet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const { name, price, category, quantity } = req.body;

    if (!name || !price || !category || !quantity) {
        return next(createHttpError(400, "All fields are required"));
    }

    if(price < 0 || quantity < 0) {
        return next(createHttpError(400, "Price and quantity must be non-negative"));
    }

    try {

        const sweet = await prisma.sweet.findUnique({
            where: { id: Number(id) }
        });

        if (!sweet) {
            return next(createHttpError(404, "Sweet not found"));
        }

        sweet.name = name;
        sweet.price = price;
        sweet.category = category;
        sweet.quantity = quantity;

        const updatedSweet = await prisma.sweet.update({
            where: { id: Number(id) },
            data: sweet
        });

        res.status(200).json(updatedSweet);
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};

export const deleteSweet = async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
        
        const sweet = await prisma.sweet.findUnique({
            where: { id: Number(id) }
        });

        if (!sweet) {
            return next(createHttpError(404, "Sweet not found"));
        }

        await prisma.sweet.delete({
            where: { id: Number(id) }
        });
        
        res.status(204).send();
    } catch (error) {
        next(createHttpError(500, "Internal Server Error"));
    }
};
