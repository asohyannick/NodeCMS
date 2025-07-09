import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Media from "../../../../model/media/media.model";
import { MediaStatus } from "../../../interfac/media/media.interfac";
const updateMediaContent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            title,
            url,
            description,
            size,
        } = req.body;
        const mediaContent = await Media.findByIdAndUpdate(id, {
            title,
            url,
            mediaType: MediaStatus.IMAGE,
            description,
            size,
        }, { new: true, runValidators: true });
        if (!mediaContent) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Media content doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Media content has been updated successfully!",
            mediaContent
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

export default updateMediaContent;