import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
const notFoundRoute = (_req: Request, res: Response) => {
    return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: "Route doesn't exist!",
        status: StatusCodes.NOT_FOUND,
    });
}

export default notFoundRoute;