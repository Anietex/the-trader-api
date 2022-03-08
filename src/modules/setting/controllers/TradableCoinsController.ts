import BaseController from '@/modules/BaseController';

import { Response, Request } from 'express';
import tradableCoinsService from '../services/tradable-coins';

class TradableCoinsController extends BaseController {
    getTradableCoins = async (req: Request, res:Response) => {
      const { user } = req;
      const pairs = await tradableCoinsService.getTradableCoins(user._id);

      res.json(this.success(pairs));
    }

    updateTradableCoins = async (req: Request, res:Response) => {
      const { user } = req;
      const data = {
        user_id: user._id,
        symbol_pairs: req.body.symbol_pairs,
      };
      const pairs = await tradableCoinsService.updateUserTradableCoins(data);

      res.json(this.success(pairs));
    }
}

export default new TradableCoinsController();
