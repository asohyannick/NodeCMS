import { model, Schema } from "mongoose";
import { ITag } from "../../service/interfac/tag/tag.interfac";
const tagSchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, default: '' },
  contentCount: { type: Number, default: 0 },
  createdBy: { type: Schema.ObjectId, ref: 'User', required: true },
}, { timestamps: true});
const Tag = model<ITag>('Tag', tagSchema);
export default Tag;
