import { Request, Response } from 'express';
import BaseController from '../../BaseController';
import userService from '../services/user';
import authService from '../services/auth';

class UserController extends BaseController {
 register = async (req: Request, res: Response) => {
   try {
     const user = await userService.createUser(req.body);
     if (user) {
       const authData = await authService.login(req.body);
       res.json(this.success(authData));
     } else {
       res.status(500).json(this.error('Unable to create user account at the moment'));
     }
   } catch (e) {
     res.status(500).json(this.error(e));
   }
 }
}

export default new UserController();