import { Request, Response } from 'express';
import BaseController from '../../BaseController';
import userService from '../services/user';
import authService from '../services/auth';

class UserController extends BaseController {
  register = async (req: Request, res: Response) => {
    try {
      await userService.createUser(req.body);
      const authData = await authService.login(req.body);
      res.json(this.success(authData));
    } catch (e) {
      res.status(500).json(this.error(e));
    }
  }

  verifyEmail = async (req: Request, res: Response) => {
    try {
      const message = await userService.verifyEmail(req.body);
      res.json(this.success(null, message));
    } catch (e) {
      res.status(422).json(this.error(e));
    }
  }

  resendEmailVerification = async (req: Request, res: Response) => {
    try {
      const message = await userService.resendEmailVerification(req.body);
      res.json(this.success(null, message));
    } catch (e) {
      res.status(422).json(this.error(e));
    }
  }
}

export default new UserController();
