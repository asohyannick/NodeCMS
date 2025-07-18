import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { mediaSchema, updateMediaSchema } from '../../utils/validator';
import showMediaContents from '../../service/impl/media/showMediaContents/showMediaContents.impl';
import createMediaContent from '../../service/impl/media/createMediaContent/createMediaContent.impl';
import showMediaContent from '../../service/impl/media/showMediaContent/showMediaContent.impl';
import updateMediaContent from '../../service/impl/media/updateMediaContent/updateMediaContent.impl';
import deleteMediaContent from '../../service/impl/media/deleteMediaContent/deleteMediaContent.impl';
const router = express.Router();
router.post('/create-media-content', authToken, globalValidator(mediaSchema), createMediaContent);
router.get('/show-media-contents', authToken, showMediaContents);
router.get('/show-media-content/:id', authToken, showMediaContent);
router.put('/update-media-content/:id', authToken, globalValidator(updateMediaSchema), updateMediaContent);
router.delete('/delete-media-content/:id', authToken, deleteMediaContent);
export default router;