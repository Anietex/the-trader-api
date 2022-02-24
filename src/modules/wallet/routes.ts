import express from 'express';
import WalletController from '@/modules/wallet/controllers/WalletController';

const router = express.Router();

router.get('/holdings', WalletController.getAccountHolding);

export default router;
