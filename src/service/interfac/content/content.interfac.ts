import { Types, Document } from 'mongoose';
export enum ContentStatus {
    DRAFT = 'Draft',
    PUBLISHED = 'Published',
    ARCHIEVED = 'Archieved',
}
export interface IContent extends Document {
    title: string; // Title of the content
    body: string; // Main content/body text
    author: Types.ObjectId; // Reference to the User who created the content
    category: Types.ObjectId; // Reference to the Category
    tags: string[]; // Array of tags associated with the content
    status: ContentStatus; // Content status
    publishedAt?: Date; // Date when the content was published
    metadata: {
        views: number; // Number of views
        likes: number; // Number of likes
        comments: number; // Number of comments
    };
}