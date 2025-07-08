import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { contentSchema } from '../../utils/validator';
import createContent from '../../service/impl/content/createContent/createContent.impl';
const router = express.Router();
router.post('/create-content', authToken, globalValidator(contentSchema), createContent);
export default router;