import CompanyRepository from '../../repositories/CompanyRepository';
import CompanyUserRepository from '../../repositories/CompanyUserRepository';
import Logger from '../../../../utils/logger';

export default (companyRepository: CompanyRepository,
  companyUserRepository: CompanyUserRepository) => async (data: any): Promise<any> => {
  try {
    const company = await companyRepository.create({
      name: data.name,
    });
    return await companyUserRepository.create({
      company: company.id,
      user: data.user_id,
    });
  } catch (e) {
    Logger.error(e);
    return false;
  }
};
