import User from "../../../../model/user/user.model";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
const verifyUserEmail = async(req: Request, res: Response): Promise<Response> => {
    const { email, token } = req.body;
    try {
        const user = await User.findOne({ email, verificationToken: token });
        if(!user) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid email or token!"});
        }
        user.isVerified = true;
        user.verificationToken = '';
        await user.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Email has been verified successfully!",
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

export default verifyUserEmail;