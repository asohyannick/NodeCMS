import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Role from "../../../../model/role/role.model";
const showRoles = async (_req: Request, res: Response): Promise<Response> => {
    try {
        const roles = await Role.find();
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User roles have been fetched successfully!",
            roles,
        });
    } catch (error) {
        console.error('Error occured!', error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        });
    }
}

export default showRoles;