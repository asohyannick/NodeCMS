import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Role from "../../../../model/role/role.model";
import { HierachyLevelStatus } from "../../../interfac/role/role.interfac";
const updateRole = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { id } = req.params;
        const { name,
            description,
            permissions,
        } = req.body;
        const role = await Role.findByIdAndUpdate(id, {
            name,
            description,
            permissions,
            hierarchyLevel: HierachyLevelStatus.VIEWER,
            isActive: true,
        }, { new: true, runValidators: true });
        if (!role) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "User role doesn't exist!" });
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "User role has been updated successfully!",
            role,
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

export default updateRole;