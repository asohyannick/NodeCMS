import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import createReview from '../../service/impl/review/createReview/createReview.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { reviewSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-review', authToken, globalValidator(reviewSchema),createReview);
export default router;