import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Media from "../../../../model/media/media.model";
import { MediaStatus } from "../../../interfac/media/media.interfac";
const createMedia = async (req: Request, res: Response): Promise<Response> => {
    const {
        title,
        url,
        description,
        size,
    } = req.body;
    try {
        const newMedia = new Media({
            title,
            url,
            mediaType: MediaStatus.VIDEO,
            description,
            size,
        });
        await newMedia.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new content media has been created successfully!",
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

export default createMedia;