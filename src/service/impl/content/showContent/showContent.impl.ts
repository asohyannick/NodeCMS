import { Request, Response } from "express";
import Content from "../../../../model/content/content.model";
import { StatusCodes } from "http-status-codes";
const showContent = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const content = await Content.findById(id);
        if (!content) {
            return res.status(StatusCodes.NOT_FOUND).json({
                message: "Content doesn't exist!"
            });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content has been fetched successfully!",
            content,
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

export default showContent;