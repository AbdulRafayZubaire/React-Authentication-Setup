import express from "express";

import forgotPasswordRoute from "../controllers/forgotPasswordRoute.js";
import resetPasswordRoute from "../controllers/resetPasswordRoute.js";

const router = express.Router();

router.route('/forgot-password/:email').put(forgotPasswordRoute);
router.route('/:passwordResetString/reset-password').put(resetPasswordRoute);



export default router;