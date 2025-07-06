import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Profile from "../../../../model/profile/profile.model";
const showProfiles = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const profiles = await Profile.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Profiles have been fetched successfully!",
            profiles
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
export default showProfiles;