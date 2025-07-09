import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Suggestion from "../../../../model/suggestion/suggestion.model";
const showSuggestionMessages = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const suggestions = await Suggestion.find(); 
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Suggestion content messages have been fetched successfully!",
            suggestions
        });
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error Message",
        });
    }
}

export default showSuggestionMessages;