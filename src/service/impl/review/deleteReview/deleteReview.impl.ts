import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Review from "../../../../model/review/review.model";
const deleteReview = async(req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const review = await Review.findByIdAndDelete(id);
        if (!review) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Content review doesn't exist!"});
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content review message has been deleted successfully!",
            review,
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

export default deleteReview;