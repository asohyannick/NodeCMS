import { Types, Document } from 'mongoose';
export interface ICategory extends Document {
  name: string; // Name of the category
  description: string; // Description of the category
  slug: string; // URL-friendly version of the category name
  isActive: boolean; // Status of the category
  metadata: {
    contentCount: number; // Number of content items in this category
    createdBy:Types.ObjectId; // Reference to the user who created the category
  };
}