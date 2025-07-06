import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import register from '../../service/impl/user/register/register.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { userRegistrationSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-account', authToken, globalValidator(userRegistrationSchema), register)
export default router;