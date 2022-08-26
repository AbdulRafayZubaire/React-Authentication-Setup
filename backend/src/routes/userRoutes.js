import express from 'express';
import SiginRoute from '../controllers/SigninRoute.js';
import SignupRoute from '../controllers/SignupRoute.js';
import updateUserInfoRoute from '../controllers/updateUserInfoRoute.js';
import emailVerificationRoute from './emailVerificationRoute.js';

const router = express.Router();

router.route('/signin').post(SiginRoute);
router.route('/signup').post(SignupRoute);
router.route('/update/:userId').put(updateUserInfoRoute);
router.route('/verify-email/:verificationString').put(emailVerificationRoute)

router.route('/')

export default router;