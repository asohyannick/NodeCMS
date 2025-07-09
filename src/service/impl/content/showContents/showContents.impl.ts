import { Request, Response } from "express";
import Content from "../../../../model/content/content.model";
import { StatusCodes } from "http-status-codes";
const showContents = async (_req: Request, res: Response): Promise<Response> => {
    try {
       const contents = await Content.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Contents have been fetched successfully!",
            contents,
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

export default showContents;