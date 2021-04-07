import { Request, Response } from 'express';
import BaseController from '../../BaseController';
import userService from '../services/user';
import authService from '../services/auth';
import companyService from '../../company/services/company';
import UserRepository from '../repositories/UserRepository';

class UserController extends BaseController {
  register = async (req: Request, res: Response) => {
    let user;
    try {
      const userRepository = new UserRepository();
      user = await userService.createUser(req.body);
      if (user) {
        const company = await companyService.createCompany({
          name: req.body.company_name,
          user_id: user.id,
        });
        if (!company) {
          await userRepository.delete({ _id: user.id });
          return res.status(500).json(this.error('Unable to create user account at the moment'));
        }
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
