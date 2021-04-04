import express from 'express';

import UserController from './controllers/UserController';
import AuthController from './controllers/AuthController';

import validateRequest from '../../utils/validate-request';
import signupRequest from './requests/sign-up';
import loginRequest from './requests/login';

const router = express.Router();

router.post('/register', signupRequest(), validateRequest, UserController.register);
router.post('/login', loginRequest(), validateRequest, AuthController.login);

export default router;
