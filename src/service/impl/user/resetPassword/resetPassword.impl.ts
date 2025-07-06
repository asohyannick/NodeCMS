import User from "../../../../model/user/user.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from 'jsonwebtoken';
import sendEmail from "../emailProvider/emailProvider.impl";
const resetPassword = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User doesn't exist!" });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '1h'
        });
        user.verificationToken = token;
        await user.save();
        await sendEmail(
            email,
            `Password reset:`,
            `Use this token to reset your password: ${token}`
        );
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Password reset email has been sent successfully!",
            user,
        });
    } catch (error) {
        console.error("Error Occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default resetPassword;