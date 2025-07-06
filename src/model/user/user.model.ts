import { model, Schema } from "mongoose";
import bcrypt from 'bcryptjs';
import { IUser } from '../../service/interfac/user/user.interfac';
const userSchema: Schema = new Schema<IUser>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    username: {
        type: String,
        trim: true,
    },
    password: {
        type: String,

    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    refreshToken: {
        type: String,
    },
}, { timestamps: true });
userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next;
});
const User = model<IUser>('User', userSchema);
export default User;