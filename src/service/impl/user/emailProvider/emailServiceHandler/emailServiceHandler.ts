import { Request, Response } from "express";
import sendEmail from "../emailProvider.impl";
import { StatusCodes } from "http-status-codes";
async function sendEmailMessage(req: Request, res: Response) {
    const { to, subject, html } = req.body;
    try {
        await sendEmail(to, subject, html);
        return res.status(StatusCodes.OK).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Failed to send email',
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export default sendEmailMessage;