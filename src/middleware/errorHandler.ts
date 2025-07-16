import { NextFunction, Request, Response } from "express";
import { isHttpError } from "http-errors";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    // console.log(error);

    let errMsg = "Unknown error occured";
    let statusCode = 500;

    if (error instanceof Error) errMsg = error.message;
    if (isHttpError(error)) statusCode = error.status;

    res.status(statusCode).json({ message: errMsg });
}