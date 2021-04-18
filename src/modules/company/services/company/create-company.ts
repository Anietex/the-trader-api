import Logger from '@/app/utils/logger';
import CompanyRepository from '@/modules/company/repositories/CompanyRepository';
import CompanyUserRepository from '@/modules/company/repositories/CompanyUserRepository';

export default (companyRepository: CompanyRepository,
  companyUserRepository: CompanyUserRepository) => async (data: any): Promise<any> => {
  try {
    const company = await companyRepository.create({
      name: data.name,
    });
    await companyUserRepository.create({
      company: company.id,
      user: data.user_id,
    });
    return company;
  } catch (e) {
    Logger.error(e);
    return false;
  }
};
