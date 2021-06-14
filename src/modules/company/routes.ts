import express from 'express';

import AppController from '@/modules/company/controllers/AppController';
import CompanyController from '@/modules/company/controllers/CompanyController';
import validateRequest from '@/app/middlewares/validate-request';
import userAuthenticated from '@/app/middlewares/user-authenticated';

import createAppRequest from './requests/create-app';
import createCompanyRequest from './requests/create-company';

const router = express.Router();

router.use('/', userAuthenticated);
router.post('/app/create', createAppRequest(), validateRequest, AppController.createApp);
router.get('/app/list', AppController.getCompanyApps);
router.delete('/app/delete/:id', AppController.deleteCompanyApp);

router.post('/company/create', createCompanyRequest(), validateRequest, CompanyController.createCompany);

export default router;
