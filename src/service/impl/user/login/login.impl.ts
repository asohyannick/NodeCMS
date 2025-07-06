import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, isAdmin: true });
        if (!user) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User doesn't exist!" });
        }
        const comparedPassword = await bcrypt.compare(user.password, password);
        if (!comparedPassword) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid Credentials!" });
        }
        const accessToken = jwt.sign({
            id: user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password,
            isAdmin: user.isAdmin
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({
            id: user._id, firstName: user.firstName, lastName: user.lastName, username: user.username, password: user.password,
            isAdmin: user.isAdmin,
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            maxAge: 90000,
            sameSite: 'strict',
        });
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User login is successful!",
            user: user._id,
            accessToken,
            refreshToken,
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

export default login;