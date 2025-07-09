import { Request, Response } from "express";
import Comment from "../../../../model/comment/comment.model";
import { StatusCodes } from "http-status-codes";
const createComment = async (req: Request, res: Response): Promise<Response> => {
    const {
        body,
        likes,
        unLikes,
    } = req.body;
    try {
        const newComment = new Comment({
            body,
            likes,
            unLikes,
            isDeleted: true,
        });
        await newComment.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new content comment has been created successfully!",
            newComment,
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

export default createComment;