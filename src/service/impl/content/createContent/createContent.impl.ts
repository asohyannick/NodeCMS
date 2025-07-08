import { Request, Response } from "express";
import Content from "../../../../model/content/content.model";
import { StatusCodes } from "http-status-codes";
import { ContentStatus } from "../../../interfac/content/content.interfac";
const createContent = async (req: Request, res: Response): Promise<Response> => {
    const {
        title,
        body,
        author,
        category,
        tags,
        metadata,
    } = req.body;
    try {
        const newContent = new Content({
            title,
            body,
            author,
            category,
            tags,
            status: ContentStatus.ARCHIEVED, // Content status
            publishedAt: Date.now(), // Date when the content was published
            metadata,
        });
        await newContent.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new content has been created successfully!",
            newContent,
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

export default createContent;