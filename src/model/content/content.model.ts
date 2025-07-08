import { model, Schema } from 'mongoose';
import { ContentStatus, IContent } from '../../service/interfac/content/content.interfac';
const contentSchema: Schema = new Schema<IContent>({
    title: { type: String, required: true, unique: true },
    body: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: Object.values(ContentStatus), default: ContentStatus.DRAFT },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    metadata: {
        views: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
        comments: { type: Number, default: 0 },
    },
}, { timestamps: true });

const Content = model<IContent>('Content', contentSchema);
export default Content;