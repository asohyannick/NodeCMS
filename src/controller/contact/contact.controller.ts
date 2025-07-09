import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import sendContactMessage from '../../service/impl/contact/sendContactMessage/sendContactMessage.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { contactSchema } from '../../utils/validator';
const router = express.Router();
router.post('/send-contact-message', authToken, globalValidator(contactSchema), sendContactMessage);
export default router;