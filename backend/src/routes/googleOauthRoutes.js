import express from 'express';
import getGoogleOauthUrlRoute from '../controllers/getGoogleOauthUrlRoute.js';
import googlOauthCallbackRoute from '../controllers/googleOauthCallbackRoute.js';

const router = express.Router();

router.route('/url').get(getGoogleOauthUrlRoute);
router.route('/callback').get(googlOauthCallbackRoute);

export default router;