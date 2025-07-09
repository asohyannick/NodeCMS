import { model, Schema } from "mongoose";
import { IContact } from "../../service/interfac/contact/contact.interfac";
const contactSchema: Schema = new Schema<IContact>({
    name: { type: String, required: true },
    email: {
        type: String,
        unique: true,
    },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    isResponded: { type: Boolean, default: false }, // Track if the contact has been responded to
});

const Contact = model<IContact>('Contact', contactSchema);
export default Contact;