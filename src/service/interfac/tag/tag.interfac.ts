import { Document, Types } from "mongoose";
export interface ITag extends Document {
    name: string; // Name of the tag
    slug: string; // URL-friendly version of the tag name
    description?: string; // Optional description of the tag
    contentCount: number; // Number of content items associated with this tag
    createdBy: Types.ObjectId; // 
}