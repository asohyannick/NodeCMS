import { Types, Document } from 'mongoose';
export interface IComment extends Document {
    ContentId: Types.ObjectId; // Reference to the content the comment is associated with
    author: Types.ObjectId; // Reference to the user who made the comment
    CommentId: Types.ObjectId | null; // Reference to a parent comment for threading
    replies: Types.ObjectId[]; // Array of replies to this comment
    body: string; // The text of the comment
    likes: number; // Number of likes the comment has received
    isDeleted: boolean; // Soft delete flag
}