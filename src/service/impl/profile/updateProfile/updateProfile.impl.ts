import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Profile from "../../../../model/profile/profile.model";
const updateProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            firstName,
            lastName,
            email,
            address,
            occupation,
            hobbies,
        } = req.body;
        const profile = await Profile.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            address,
            occupation,
            hobbies,
            date: Date.now(),
        }, { new: true, runValidators: true });
        if (!profile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User profile doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Profile has been updated successfully!",
            profile
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
export default updateProfile;