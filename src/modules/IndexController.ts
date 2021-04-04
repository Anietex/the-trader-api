import { Request, Response } from 'express';
import BaseController from './BaseController';

class IndexController extends BaseController {
  public index = (req: Request, res: Response) => {
    res.json(this.success(null, 'Welcome to Bitris API'));
  }

  public pageNotFound = (req: Request, res: Response) => {
    res.status(404).json(this.error('Page not found'));
  }
}

export default new IndexController();
