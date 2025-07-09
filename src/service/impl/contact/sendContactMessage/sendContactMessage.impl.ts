import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Contact from "../../../../model/contact/contact.model";
const sendContactMessage = async (req: Request, res: Response): Promise<Response> => {
    const { name, email, subject, message } = req.body;
    try {
        const newMessage = new Contact({
            name,
            email,
            subject,
            message,
            isResponded: true,
        });
        await newMessage.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new contact messsage has been sent successfully!",
            newMessage,
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

export default sendContactMessage;