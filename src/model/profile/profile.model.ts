import { model, Schema } from "mongoose";
import { IProfile } from '../../service/interfac/profile/profile.interfac';
const profileSchema: Schema = new Schema<IProfile>({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    address: {
        street: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        country: {
            type: String,
        },
        zipCode: {
            type: String,
        },
    },
    occupation: {
        type: String,
    },
    hobbies: {
        type: [String],
        default: [],
    },
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });
const Profile = model<IProfile>('Profile', profileSchema);
export default Profile;