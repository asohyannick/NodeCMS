import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Category from "../../../../model/category/category.model";
const createCategory = async (req: Request, res: Response): Promise<Response> => {
    const {
        name,
        description,
        slug,
        isActive,
        metadata,
    } = req.body;
    try {
        const newCategory = new Category({
            name,
            description,
            slug,
            isActive,
            metadata,
        });
        await newCategory.save();
        return res.status(StatusCodes.CREATED).json({
            success: true,
            message: "A new category has been created successfully!",
            newCategory
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

export default createCategory;