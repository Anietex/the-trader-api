import BaseController from '@/modules/BaseController';
import appService from '@/modules/company/services/app';
import apiKeyService from '@/modules/company/services/api-key';
import { Request, Response } from 'express';
import CompanyUserRepository from '@/modules/company/repositories/CompanyUserRepository';

class AppController extends BaseController {
   createApp = async (req : Request, res: Response) => {
     try {
       const { user } = req;
       const companyUser = await (new CompanyUserRepository()).getCompanyUser({ user: user._id });
       const createAppData = {
         user_id: user._id,
         company_id: companyUser.company._id,
         ...req.body,
       };
       // Create app first
       const app = await appService.createApp(createAppData);

       if (app) {
         // Create test api keys
         const testApiKey = await apiKeyService.createKey({
           environment: 'test',
           app_id: app._id,
           user,
         });

         // Create production api keys
         const prodApiKey = await apiKeyService.createKey({
           environment: 'production',
           app_id: app._id,
           user,
         });
         // Transform and format data sent as api response
         const resData = AppController.transformApp(app, prodApiKey, testApiKey);
         res.status(201).json(this.success(resData));
       } else {
         res.status(500).json(this.error('Unable to create app at the moment'));
       }
     } catch (e) {
       res.status(500).json(this.error(e));
     }
   }

   private static transformApp(app: any, prodApiKey:any, testApiKey: any) {
     return {
       name: app.name,
       slug: app.slug,
       status: app.status,
       created_by: {
         name: `${app.created_by.first_name} ${app.created_by.last_name}`,
         email: app.created_by.email,
       },
       api_key: {
         production: [prodApiKey],
         test: [testApiKey],
       },
       app_setting: {
         accepted_coins: app.app_setting.accepted_coins,
         status: app.app_setting.status,
       },
     };
   }
}

export default new AppController();
