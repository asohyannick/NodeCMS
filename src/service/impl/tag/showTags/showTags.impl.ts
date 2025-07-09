import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../../../model/tag/tag.model";
const showTags = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const tags = await Tag.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content tags have been fetched successfully!",
            tags,
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

export default showTags;