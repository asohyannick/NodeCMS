import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../../../model/tag/tag.model";
const createTag = async (req: Request, res: Response): Promise<Response> => {
    const { name, slug, description, contentCount } = req.body;
    try {
        const newTag = new Tag({
            name,
            slug,
            description,
            contentCount
        });
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new content tag has been created successfully!",
            newTag,
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

export default createTag;