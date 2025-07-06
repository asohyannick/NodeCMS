import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import bcrypt from 'bcryptjs';
const changePassword = async (req: Request, res: Response): Promise<Response> => {
    const { email, token, newPassword } = req.body;
    try {
        const user = await User.findOne({ email, verificationToken: token });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        user.password = await bcrypt.hash(newPassword, 10);
        user.verificationToken = '';
        await user.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Password has been changed successfully!",
            user,
        });
    } catch (error) {
        console.error(" Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default changePassword;