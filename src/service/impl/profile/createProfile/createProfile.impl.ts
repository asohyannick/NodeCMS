import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Profile from "../../../../model/profile/profile.model";
const createProfile = async (req: Request, res: Response): Promise<Response> => {
    const { firstName, lastName, email, address, occupation, hobbies } = req.body;
    try {
        const newProfile = new Profile({
            firstName,
            lastName,
            email,
            address,
            occupation,
            hobbies,
            date: Date.now(),
        });
        await newProfile.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "Profile has been created successfully!",
            newProfile
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }
}
export default createProfile;