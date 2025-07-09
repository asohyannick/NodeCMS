import { Request, Response } from "express";
import Content from "../../../../model/content/content.model";
import { StatusCodes } from "http-status-codes";
const searchContent = async (req: Request, res: Response): Promise<Response> => {
    const {
        title,
        body,
        author,
        category,
        tags,
        views,
        likes,
        comments,
        status,
        sortBy = 'publishedAt', // Default sort field
        sortOrder = 'asc', // Default order
        page = 1,
        limit = 12,
    } = req.query;
    const pageNumber = typeof page === 'string' ? parseInt(page) : 1;
    const limitNumber = typeof limit === 'string' ? parseInt(limit) : 12;
    const filter: any = {};
    try {
        // Filter by title and among other fields OR
        // Construct filter based on query parameters
        if (title) {
            filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
        }
        if (body) {
            filter.body = { $regex: body, $options: 'i' };
        }
        if (author) {
            filter.author = author; // Assuming author is an ObjectId
        }
        if (status) {
            filter.status = status;
        }
        if (category) {
            filter.category = category;
        }
        if (tags && typeof tags === 'string') {
            filter.tags = { $in: tags.split(',').map(tag => typeof tag === 'string' ? tag.trim() : tag) }
        } else if (Array.isArray(tags)) {
            filter.tags = { $in: tags.map(tag => (typeof tag === 'string' ? tag.trim() : tag)) };
        }
        // Metadata filtering
        if (views) {
            filter['metadata.views'] = { $gte: Number(views) }; // Filter for views greater than or equal to specified value
        }
        if (likes) {
            filter['metadata.likes'] = { $gte: Number(likes) }; // Filter for likes greater than or equal to specified value
        }
        if (comments) {
            filter['metadata.comments'] = { $gte: Number(comments) }; // Filter for comments greater than or equal to specified value
        }
        const sortOptions: any = {};
        if (sortBy && typeof sortBy === 'string') {
            sortOptions[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }
        const totalContents = await Content.countDocuments(filter);
        const contents = await Content.find(filter)
            .sort(sortOptions)
            .skip((pageNumber - 1) * limitNumber) // calculate the number of documents to skip
            .limit(Number(limit)) // Limit the number of documents to returned from the database
        return res.status(StatusCodes.OK).json({
            success: true,
            totalContents,
            contents,
            totalPages: Math.ceil(totalContents / limitNumber),
            currentPage: pageNumber
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

export default searchContent;