import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const logout = async (_req: Request, res: Response) => {
    try {
        res.cookie('auth', '', {
            expires: new Date(0),
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            maxAge: 90000,
            sameSite: 'strict',
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User has been logged out successfully!",
        });
    } catch (error) {
        console.error('Error ocurred!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default logout;