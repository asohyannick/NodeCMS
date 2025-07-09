import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import createComment from '../../service/impl/comment/createComment/createComment.impl';
import { commentSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-comment', authToken, globalValidator(commentSchema), createComment);
export default router;