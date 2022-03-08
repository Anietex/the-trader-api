import BaseController from '@/modules/BaseController';
import marketDataService from '@/modules/market/services/market-data';
import { Request, Response } from 'express';

class MarketDataController extends BaseController {
  getAllSymbols = async (req: Request, res: Response) => {
    const symbols = await marketDataService.getAllSymbols();

    res.json(this.success(symbols));

    // this.success(symbols);
  }

  getLastTradedPrice = async (req: Request, res: Response) => {
    const coins = await marketDataService.getLastTradedPrice();

    res.json(this.success(coins));
  }
}

export default new MarketDataController();
