import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../../../model/tag/tag.model";
const showTag = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const tag = await Tag.findById(id);
        if (!tag) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Content tag doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content tag has been fetched successfully!",
            tag,
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

export default showTag;