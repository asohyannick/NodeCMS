import { model, Schema } from "mongoose";
import { IComment } from "../../service/interfac/comment/comment.interfac";
const commentSchema: Schema = new Schema<IComment>({
    ContentId: { type: Schema.Types.ObjectId, ref: 'Content' },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    body: { type: String },
    CommentId: { type: Schema.Types.ObjectId, ref: 'Comment', default: null },
    replies: [{ type: Schema.Types.ObjectId, ref: 'Comment', default: [] }],
    likes: { type: Number, default: 0 },
    isDeleted: { type: Boolean, default: false },
});

const Comment = model<IComment>('Comment', commentSchema);
export default Comment;