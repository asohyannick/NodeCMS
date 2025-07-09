import express from 'express';
import authToken from '../../middleware/auth/auth.middleware';
import globalValidator from '../../middleware/globalValidator/globalValidator';
import { suggestionSchema, updateSuggestionSchema } from '../../utils/validator';
import sendSuggestionMessage from '../../service/impl/suggestion/sendSuggestionMessage/sendSuggestionMessage.impl';
import showSuggestionMessages from '../../service/impl/suggestion/showSuggestionMessages/showSuggestionMessages.impl';
import showSuggestionMessage from '../../service/impl/suggestion/showSuggestionMessage/showSuggestionMessage.impl';
import updateSuggestionMessage from '../../service/impl/suggestion/updateSuggestionMessage/updateSuggestionMessage.impl';
const router = express.Router();
router.post('/send-suggestion-message', authToken, globalValidator(suggestionSchema), sendSuggestionMessage);
router.get('/show-suggestion-messages', authToken, showSuggestionMessages);
router.get('/show-suggestion-message/:id', authToken, showSuggestionMessage);
router.put('/update-suggestion-message/:id', authToken, globalValidator(updateSuggestionSchema), updateSuggestionMessage);

export default router;