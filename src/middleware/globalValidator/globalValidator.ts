import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { AnySchema } from "yup";
const globalValidator = (schema: AnySchema) => {
    return async(req: Request, res: Response, next: NextFunction) => {
        try {
            await schema.validate(req.body, { abortEarly: false});
            next();
        } catch (error) {
            console.error('Validation error', error);
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: "Custom validation has failed!",
                error: error instanceof Error ? error.message : "Unknown Error Occured!",
            });
        }
    }
}

export default globalValidator;