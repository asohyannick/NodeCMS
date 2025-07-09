import { Types, Document } from 'mongoose';
export interface ISuggestion extends Document {
    author: Types.ObjectId; // Reference to the user making the suggestion
    contentId?: Types.ObjectId; // Optional reference to related content
    suggestion: string; // The suggestion text
    isImplemented: boolean; // Flag to indicate if the suggestion has been implemented
}