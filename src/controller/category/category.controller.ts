import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { categorySchema } from '../../utils/validator';
import createCategory from '../../service/impl/category/createCategory/createCategory.impl';
const router = express.Router();
router.post('/create-category', authToken, globalValidator(categorySchema), createCategory);
export default router;