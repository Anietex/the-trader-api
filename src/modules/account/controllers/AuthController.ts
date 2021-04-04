import { Request, Response } from 'express';
import BaseController from '../../BaseController';
import authService from '../services/auth';

class AuthController extends BaseController {
  login = async (req: Request, res: Response) => {
    try {
      const authData = await authService.login(req.body);
      if (!authData) {
        return res.status(401).json(this.error('Invalid username or password'));
      }
      // if (!authData.user.email_verified) {
      //   return res.status(401).json(this.error('Please verify your email to continue'));
      // }
      return res.json(this.success(authData));
    } catch (e) {
      return res.status(500).json(this.error(e));
    }
  }
}

export default new AuthController();
