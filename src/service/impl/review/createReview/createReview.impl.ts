import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Review from "../../../../model/review/review.model";
const createReview = async (req: Request, res: Response): Promise<Response> => {
    const { rating, comment } = req.body;
    try {
        const newReview = new Review({
            rating,
            comment,
            isApproved: true,
        });
        await newReview.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new review message has been added successfully!",
            newReview,
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

export default createReview;