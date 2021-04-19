import BaseController from '@/modules/BaseController';
import appService from '@/modules/company/services/app';
import apiKeyService from '@/modules/company/services/api-key';
import { Request, Response } from 'express';
import CompanyUserRepository from '@/modules/company/repositories/CompanyUserRepository';
import Logger from '@/app/utils/logger';

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

   public getCompanyApps = async (req: Request, res: Response) => {
     try {
       const { user } = req;
       const companyUser = await (new CompanyUserRepository()).getCompanyUser({ user: user._id });
       const criteria = { company: companyUser.company._id };
       const apps = await appService.listApps(criteria);
       res.json(this.success(apps));
     } catch (e) {
       Logger.error(e);
       res.status(500).json(this.error('Unable to list users at the moment'));
     }
   }

   public deleteCompanyApp = async (req: Request, res: Response) => {
     try {
       const deleted = await appService.deleteApp({ _id: req.params.id });
       if (deleted) {
         res.json(this.success(deleted, 'App deleted successfully'));
       } else {
         res.status(404).json(this.error('Unable to delete a non existent app', false));
       }
     } catch (e) {
       Logger.error(e);
       res.status(500).json(this.error('Unable to delete app'));
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
