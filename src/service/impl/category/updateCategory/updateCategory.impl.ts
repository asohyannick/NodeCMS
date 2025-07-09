import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../../../../model/category/category.model";
const updateCategory = async (req: Request, res: Response): Promise<Response> => {
    try {
        const {
            name,
            description,
            slug,
            isActive,
            metadata,
        } = req.body;
        const { id } = req.params;
        const category = await Category.findByIdAndUpdate(id, {
            name,
            description,
            slug,
            isActive,
            metadata,
        }, { new: true, runValidators: true });
        if (!category) {
            return res.status(StatusCodes.NOT_FOUND).json({ message: "Content category doesn't exist!" })
        }
        return res.status(StatusCodes.OK).json({
            success: true,
            message: "Content category has been updated successfully!",
            category,
        });
    } catch (error) {
        console.error("Error occured!", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: "Something went wrong!",
            error: error instanceof Error ? error.message : "Unknown Error",
        })
    }
}

export default updateCategory;