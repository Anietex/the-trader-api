import { Request, Response } from 'express';
import BaseController from '@/modules/BaseController';
import companyService from '@/modules/company/services/company';

class CompanyController extends BaseController {
  createCompany = async (req: Request, res: Response) => {
    try {
      const company = await companyService.createCompany(req.body);
      res.json(this.success(company));
    } catch (e) {
      res.status(500).json(this.error(e));
    }
  }
}

export default new CompanyController();
