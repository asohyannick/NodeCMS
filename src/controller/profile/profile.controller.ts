import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import createProfile from '../../service/impl/profile/createProfile/createProfile.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { profileSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-profile', authToken, globalValidator(profileSchema), createProfile);
export default router;