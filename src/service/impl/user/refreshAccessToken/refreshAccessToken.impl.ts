import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import jwt, { JwtPayload } from 'jsonwebtoken';
const refreshAccessToken = async (req: Request, res: Response) => {
    const { refreshToken } = req.body;
    try {
        if (!refreshToken) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Token doesn't exist!" });
        }
        const userPayload = jwt.verify(refreshToken, process.env.JWT_SECRET_KEY as string) as JwtPayload;
        const user = await User.findById(userPayload.id);
        if (!user || refreshToken !== refreshToken) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Credentials!" });
        }
        const accessToken = jwt.sign({
            id: user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "A new access token has been created for you successfully!",
            accessToken,
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

export default refreshAccessToken;