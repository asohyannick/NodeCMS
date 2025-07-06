import { model, Schema } from "mongoose";
import { IRole, HierachyLevelStatus } from "../../service/interfac/role/role.interfac";
const roleSchema: Schema = new Schema<IRole>({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    permissions: {
        type: [String],
        default: [],
    },
    hierarchyLevel: {
        type: String,
        enum: Object.values(HierachyLevelStatus),
        default: HierachyLevelStatus.EDITOR,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });
const Role = model<IRole>('Role', roleSchema);
export default Role;