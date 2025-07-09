import { model, Schema } from "mongoose";
import { IReview } from "../../service/interfac/review/review.interfac";
const reviewSchema: Schema = new Schema<IReview>({
  contentId: { type: Schema.ObjectId, ref: 'Content' },
  author: { type: Schema.ObjectId, ref: 'User' },
  rating: { type: Number },
  comment: { type: String },
  isApproved: { type: Boolean, default: false }, // Reviews may require approval
});

const Review = model<IReview>('Review', reviewSchema);
export default Review;