import { Request, Response } from "express";
import Comment from "../../../../model/comment/comment.model";
import { StatusCodes } from "http-status-codes";
const unLikeComment = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const comment = await Comment.findById(id);
        if (!comment) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Content comment doesn't exist!"});
        }
        // Decrement likes if likes is greater than 0
        if (comment.likes > 0) {
           comment.likes -= 1;
           await comment.save();
        }
        await comment.save();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content comment has been unLiked successfully!",
            comment
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

export default unLikeComment;