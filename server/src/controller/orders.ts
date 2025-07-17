import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import prisma from "../database";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const { userId, sweets } = req.body;

  if (!userId || !Array.isArray(sweets) || sweets.length === 0) {
    return next(createHttpError(400, "Invalid order data"));
  }

  try {
    // Validate user
    const user = await prisma.users.findUnique({ where: { id: userId } });
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    // Validate sweets and calculate total price
    let totalPrice = 0;
    const orderItems = await Promise.all(
      sweets.map(async (item: { sweetId: number; quantity: number }) => {
        const sweet = await prisma.sweets.findUnique({ where: { id: item.sweetId } });
        
        if (!sweet) {
          throw createHttpError(404, "Sweet not found");
        }

        if (item.quantity <= 0 || sweet.quantity < item.quantity) {
          throw createHttpError(400, "Invalid quantity for sweet");
        }
        
        totalPrice += sweet.price * item.quantity;

        await prisma.sweets.update({
            where: { id: item.sweetId },
            data: { quantity: sweet.quantity - item.quantity }
        });
        
        return {
          sweetId: item.sweetId,
          quantity: item.quantity,
          price: sweet.price
        };
      })
    );

    // Create order
    const order = await prisma.orders.create({
      data: {
        userId,
        totalPrice,
        orderItems: {
          create: orderItems,
        },
      },
      include: {
        orderItems: {
          include: {
            sweet: true,
          },
        },
      },
    });

    res.status(201).json(order);
  } catch (error) {
    if (error instanceof createHttpError.HttpError) {
      next(error);
    } else {
      next(createHttpError(500, "Failed to create order"));
    }
  }
};

export const getOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await prisma.orders.findMany({
      include: {
        orderItems: {
          include: {
            sweet: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    next(createHttpError(500, "Failed to fetch orders"));
  }
};

export const getOrdersByUserId = async (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;

  try {

    const user = await prisma.users.findUnique({ where: { id: Number(userId) } });
    
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }

    const orders = await prisma.orders.findMany({
      where: { userId: Number(userId) },
      orderBy: { purchasedAt: 'desc' },
      include: {
        orderItems: {
          include: {
            sweet: true,
          },
        },
      },
    });

    res.status(200).json(orders);
  } catch (error) {
    next(createHttpError(500, "Failed to fetch orders for user"));
  }
};