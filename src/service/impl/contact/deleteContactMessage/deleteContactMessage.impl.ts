import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const deleteContactMessage = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const showMessage = await Contact.findByIdAndDelete(id);
        if (!showMessage) {
            return res.status(StatusCodes.NOT_FOUND).json({message: "Contact message doesn't exist!"})
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Contact messsage has been deleted successfully!",
            showMessage,
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

export default deleteContactMessage;