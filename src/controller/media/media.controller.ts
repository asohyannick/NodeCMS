import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { mediaSchema } from '../../utils/validator';
import createMedia from '../../service/impl/media/createMedia/createMedia.impl';
const router = express.Router();
router.post('/create-media', authToken, globalValidator(mediaSchema), createMedia);
export default router;