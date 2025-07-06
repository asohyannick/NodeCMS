import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const showUsers = async (_req: Request, res: Response) => {
    try {
        const users = await User.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Users have been retrieved successfully!",
            users,
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

export default showUsers;