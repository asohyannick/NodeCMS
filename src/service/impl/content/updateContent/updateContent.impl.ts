import { Request, Response } from "express";
import Content from "../../../../model/content/content.model";
import { StatusCodes } from "http-status-codes";
import { ContentStatus } from "../../../interfac/content/content.interfac";
const updateContent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            title,
            body,
            author,
            category,
            tags,
            metadata,
        } = req.body;
        const content = await Content.findByIdAndUpdate(id, {
            title,
            body,
            author,
            category,
            tags,
            status: ContentStatus.PUBLISHED, // Content status
            publishedAt: Date.now(), // Date when the content was published
            metadata,
        }, { new: true, runValidators: true });
        if (!content) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Content doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content has been updated successfully!",
            content,
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

export default updateContent;