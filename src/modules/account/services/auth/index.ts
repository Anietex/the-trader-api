import UserRepository from '../../repositories/UserRepository';
import login from './login';
import CompanyUserRepository from '../../../company/repositories/CompanyUserRepository';

const userRepository = new UserRepository();
const companyUserRepository = new CompanyUserRepository();

export default {
  login: login(userRepository, companyUserRepository),
};
