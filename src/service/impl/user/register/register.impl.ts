import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import User from "../../../../model/user/user.model";
import jwt from 'jsonwebtoken';
const register = async (req: Request, res: Response) => {
    const { firstName, lastName, username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user) {
            user.refreshToken = '',
                await user.save();
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exist" });
        }
        const newUser = new User({
            firstName,
            lastName,
            username,
            password,
            isAdmin: true,
        });
        await newUser.save();
        const accessToken = jwt.sign({
            id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, username: newUser.username, password: newUser.password,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        const refreshToken = jwt.sign({
            id: newUser._id, firstName: newUser.firstName, lastName: newUser.lastName, username: newUser.username, password: newUser.password,
            isAdmin: newUser.isAdmin
        }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: '15m'
        });
        newUser.refreshToken = refreshToken;
        await newUser.save();
        res.cookie('auth', accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV as string === 'production',
            maxAge: 90000,
            sameSite: 'strict',
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "User registration is successful!",
            user: newUser._id,
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

export default register;