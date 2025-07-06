import { Document } from "mongoose";
export interface IUser extends Document {
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    isAdmin: boolean;
    refreshToken: string;
    isVerified: boolean;
    verificationToken: string;
}