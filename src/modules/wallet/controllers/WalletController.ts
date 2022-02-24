import BaseController from '@/modules/BaseController';
import { Request, Response } from 'express';
import walletService from '../services/wallet';

class WalletController extends BaseController {
    getAccountHolding = async (req: Request, res: Response) => {
      const holdings = await walletService.getAccountHoldings();

      res.json(this.success(holdings));
    }
}

export default new WalletController();
