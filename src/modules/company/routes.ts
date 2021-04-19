import express from 'express';

import AppController from '@/modules/company/controllers/AppController';
import validateRequest from '@/app/middlewares/validate-request';
import userAuthenticated from '@/app/middlewares/user-authenticated';

import createAppRequest from './requests/create-app';

const router = express.Router();

router.use('/', userAuthenticated);
router.post('/app/create', createAppRequest(), validateRequest, AppController.createApp);
router.get('/app/list', AppController.getCompanyApps);
router.delete('/app/delete/:id', AppController.deleteCompanyApp);

export default router;
