import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Suggestion from "../../../../model/suggestion/suggestion.model";
const updateSuggestionMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const {
            suggestion,
        } = req.body;
        const contentSuggestion = await Suggestion.findByIdAndUpdate(id, {
            suggestion,
            isImplemented: true,
        }, { new: true, runValidators: true });
        if (!contentSuggestion) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Suggestion content message doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Suggestion content message has been updated successfully!",
            contentSuggestion,
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

export default updateSuggestionMessage;