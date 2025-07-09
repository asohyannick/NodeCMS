import { Schema, model } from "mongoose";
import { MediaStatus, IMedia } from "../../service/interfac/media/media.interfac";
const mediaSchema: Schema = new Schema<IMedia>({
    title: { type: String, required: true },
    url: { type: String, required: true, unique: true },
    mediaType: {
        type: String,
        enum: Object.values(MediaStatus),
        default: MediaStatus.AUDIO,
    },
    description: { type: String, default: '' },
    size: { type: Number, required: true }, // Size in bytes
    uploadedBy: { type: Schema.ObjectId, ref: 'User', required: true },
    relatedContent: [
        {
            type: Schema.ObjectId,
            ref: 'Content'
    }], // Array of related content IDs
});

const Media = model<IMedia>('Media', mediaSchema);
export default Media;