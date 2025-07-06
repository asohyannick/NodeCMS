import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            username,
            password,
        } = req.body;
        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            username,
            password,
            isAdmin: true,
        }, { new: true, runValidators: true });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User has been updated successfully!",
            user,
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

export default updateUser;