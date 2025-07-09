import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Suggestion from "../../../../model/suggestion/suggestion.model";
const sendSuggestionMessage = async (req: Request, res: Response): Promise<Response> => {
    const { suggestion } = req.body;
    try {
        const newSuggestionMessage = new Suggestion({
            suggestion,
            isImplemented: true,
        });
        await newSuggestionMessage.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new suggestion message has been added successfully!",
            newSuggestionMessage,
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

export default sendSuggestionMessage;