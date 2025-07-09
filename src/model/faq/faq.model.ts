import { model, Schema } from "mongoose";
import { IFAQ } from "../../service/interfac/faq/faq.interfac";
const faqSchema: Schema = new Schema<IFAQ>({
  question: { type: String, required: true, unique: true },
  answer: { type: String, required: true },
  category: { type: String, default: '' },
  isActive: { type: Boolean, default: false },
});

const FAQ = model<IFAQ>('FAQ', faqSchema);
export default FAQ;