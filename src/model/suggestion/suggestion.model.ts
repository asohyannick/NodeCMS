import { model, Schema } from "mongoose";
import { ISuggestion } from "../../service/interfac/suggestion/suggestion.interfac";
const suggestionSchema: Schema = new Schema<ISuggestion>({
    author: { type: Schema.ObjectId, ref: 'User', },
    contentId: { type: Schema.ObjectId, ref: 'Content', }, // Optional association
    suggestion: { type: String, },
    isImplemented: { type: Boolean, default: false }, // Track if the suggestion has been acted upon
}, { timestamps: true });
const Suggestion = model<ISuggestion>('Suggestion', suggestionSchema);
export default Suggestion;
