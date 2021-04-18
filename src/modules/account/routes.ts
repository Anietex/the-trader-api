import express from 'express';

import validateRequest from '@/app/middlewares/validate-request';
import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import signupRequest from './requests/sign-up';
import loginRequest from './requests/login';

const router = express.Router();

router.post('/register', signupRequest(), validateRequest, UserController.register);
router.post('/login', loginRequest(), validateRequest, AuthController.login);

export default router;
