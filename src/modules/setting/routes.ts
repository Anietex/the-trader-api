import express from 'express';
import TradableCoinsController from '@/modules/setting/controllers/TradableCoinsController';
import userAuthenticated from '@/app/middlewares/user-authenticated';
import validateRequest from '@/app/middlewares/validate-request';
import updateTradableCoinsRequest from './requests/update-tradable-coins';

const router = express.Router();

router.use('/', userAuthenticated);

router.get('/tradable-coins', TradableCoinsController.getTradableCoins);
router.post('/update-tradable-coins', updateTradableCoinsRequest(), validateRequest, TradableCoinsController.updateTradableCoins);

export default router;
