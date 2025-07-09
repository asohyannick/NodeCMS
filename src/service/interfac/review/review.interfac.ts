import { Types, Document } from 'mongoose';
export interface IReview extends Document {
  contentId:Types.ObjectId; // Reference to the content being reviewed
  author:Types.ObjectId; // Reference to the user who made the review
  rating: number; // Rating given by the user (1-5)
  comment: string; // Review comment
  isApproved: boolean; // Flag to indicate if the review is approved
}