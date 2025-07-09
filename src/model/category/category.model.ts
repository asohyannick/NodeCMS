import { Schema, model } from "mongoose";
import { ICategory } from "../../service/interfac/category/category.interfac";
const categorySchema: Schema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true },
    metadata: {
        contentCount: { type: Number, default: 0 },
        createdBy: { type: Schema.ObjectId, ref: 'User', required: true },
    },
});

const Category = model<ICategory>('Category', categorySchema);
export default Category;