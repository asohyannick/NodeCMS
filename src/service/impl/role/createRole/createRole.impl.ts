import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Role from "../../../../model/role/role.model";
import { HierachyLevelStatus } from "../../../interfac/role/role.interfac";
const createRole = async (req: Request, res: Response): Promise<Response> => {
    const { name, description, permissions, } = req.body;
    try {
        const newRole = new Role({
            name,
            description,
            permissions,
            hierarchyLevel: HierachyLevelStatus.ADMIN,
            isActive: true,
        });
        await newRole.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new role has been created successfully!",
            newRole,
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

export default createRole;