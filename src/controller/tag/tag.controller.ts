import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { tagSchema } from '../../utils/validator';
import createTag from '../../service/impl/tag/createTag/createTag.impl';
const router = express.Router();
router.post('/create-tag', authToken, globalValidator(tagSchema), createTag);
export default router;