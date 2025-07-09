import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { suggestionSchema } from '../../utils/validator';
import sendSuggestionMessage from '../../service/impl/suggestion/sendSuggestionMessage/sendSuggestionMessage.impl';
const router = express.Router();
router.post('/send-suggestion-message', authToken, globalValidator(suggestionSchema), sendSuggestionMessage);

export default router;