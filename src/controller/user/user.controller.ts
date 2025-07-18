import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import register from '../../service/impl/user/register/register.impl';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { updateUserRegistrationSchema, userLoginSchema, userRegistrationSchema } from '../../utils/validator';
import login from '../../service/impl/user/login/login.impl';
import showUsers from '../../service/impl/user/showUsers/showUsers.impl';
import showUser from '../../service/impl/user/showUser/showUser.impl';
import updateUser from '../../service/impl/user/updateUser/updateUser.impl';
import deleteUser from '../../service/impl/user/deleteUser/deleteUser.impl';
import logout from '../../service/impl/user/logout/logout.impl';
import refreshAccessToken from '../../service/impl/user/refreshAccessToken/refreshAccessToken.impl';
import verifyUserEmail from '../../service/impl/user/verifyEmail/verifyEmail.impl';
import sendEmailMessage from '../../service/impl/user/emailProvider/emailServiceHandler/emailServiceHandler';
import changePassword from '../../service/impl/user/changePassword/changePassword.impl';
import resetPassword from '../../service/impl/user/resetPassword/resetPassword.impl';
const router = express.Router();
router.post('/create-account', authToken, globalValidator(userRegistrationSchema), register);
router.post('/login', authToken, globalValidator(userLoginSchema), login);
router.post('/logout', authToken, logout);
router.post('/send-email', authToken, sendEmailMessage);
router.post('/refresh-access-token', authToken, refreshAccessToken);
router.post('/verify-user-email', authToken, verifyUserEmail);
router.post('/reset-password', authToken, resetPassword);
router.post('/change-password', authToken, changePassword);
router.get('/show-users', authToken, showUsers);
router.get('/show-user/:id', authToken, showUser);
router.put('/update-user/:id', authToken, globalValidator(updateUserRegistrationSchema), updateUser);
router.delete('/delete-user/:id', authToken, deleteUser);
export default router;