import express from 'express';
import MarketDataController from '@/modules/market/controllers/MarketDataController';

const router = express.Router();

router.get('/all-symbols', MarketDataController.getAllSymbols);
router.get('/last-traded-price', MarketDataController.getLastTradedPrice);

export default router;
