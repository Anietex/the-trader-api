import express from 'express';

import validateRequest from '@/app/middlewares/validate-request';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import signupRequest from './requests/sign-up';
import loginRequest from './requests/login';
import verifyEmailRequest from './requests/verrify-email';
import resendEmailVerificationRequest from './requests/resend-email-verification';

const router = express.Router();

router.post('/register', signupRequest(), validateRequest, UserController.register);
router.post('/verify-email', verifyEmailRequest(), validateRequest, UserController.verifyEmail);
router.post('/resend-email-verification', resendEmailVerificationRequest(), validateRequest, UserController.resendEmailVerification);
router.post('/login', loginRequest(), validateRequest, AuthController.login);

export default router;
