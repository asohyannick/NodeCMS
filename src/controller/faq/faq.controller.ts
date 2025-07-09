import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { faqSchema } from '../../utils/validator';
import createQuestion from '../../service/impl/faq/createQuestion/createQuestion.impl';
const router = express.Router();
router.post('/create-question', authToken, globalValidator(faqSchema), createQuestion);
export default router;