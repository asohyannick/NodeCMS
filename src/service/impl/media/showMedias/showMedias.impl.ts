import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Media from "../../../../model/media/media.model";
const showMediaContents = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const mediaContents = await Media.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Media contents have been fetched successfully!",
            mediaContents,
        });
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showMediaContents;