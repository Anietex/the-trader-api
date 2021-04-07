import createCompany from './create-company';
import CompanyUserRepository from '../../repositories/CompanyUserRepository';
import CompanyRepository from '../../repositories/CompanyRepository';

const companyRepository = new CompanyRepository();
const companyUserRepository = new CompanyUserRepository();

export default {
  createCompany: createCompany(companyRepository, companyUserRepository),
};
