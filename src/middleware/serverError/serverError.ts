import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
const backendServerErrorRoute = (_req: Request, res: Response) => {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Internal Server Error",
        status: StatusCodes.INTERNAL_SERVER_ERROR,
    });
}

export default backendServerErrorRoute;