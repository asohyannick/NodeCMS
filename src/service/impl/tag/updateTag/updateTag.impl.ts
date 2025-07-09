import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Tag from "../../../../model/tag/tag.model";
const updateTag = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { 
            name,
            slug,
            description,
            contentCount
        } = req.body;
        const { id } = req.params;
        const tag = await Tag.findByIdAndUpdate(id, {
            name,
            slug,
            description,
            contentCount
        }, { new: true, runValidators: true });
        if (!tag) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Content tag doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content tag has been updated successfully!",
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

export default updateTag;