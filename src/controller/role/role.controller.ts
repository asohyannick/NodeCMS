import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import createRole from '../../service/impl/role/createRole/createRole.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { roleSchema } from '../../utils/validator';
const router = express.Router();
router.post('/create-role', authToken, globalValidator(roleSchema), createRole);
export default router;