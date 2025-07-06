import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Profile from "../../../../model/profile/profile.model";
const showProfile = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const profile = await Profile.findById(id);
        if (!profile) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "User profile doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Profile has been fetched successfully!",
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
export default showProfile;