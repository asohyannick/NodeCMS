import { Request, Response } from "express";
import Comment from "../../../../model/comment/comment.model";
import { StatusCodes } from "http-status-codes";
const showComments = async(_req: Request, res: Response): Promise<Response> => {
    try {
        const comments = await Comment.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content comments have been fetched successfully!",
            comments
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

export default showComments;