import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import FAQ from "../../../../model/faq/faq.model";
const showQuestions = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const questions = await FAQ.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content questions have been fetched successfully!",
            questions,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }
}

export default showQuestions;