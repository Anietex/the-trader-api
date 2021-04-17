import UserRepository from '../../repositories/UserRepository';
import Logger from '../../../../utils/logger';
import PasswordHash from '../../../../utils/password-hash';
import jwt from '../../../../utils/jwt';
import CompanyUserRepository from '../../../company/repositories/CompanyUserRepository';

export default (userRepository: UserRepository,
  companyUserRepository: CompanyUserRepository) => async (data: any) => {
  try {
    const user = await userRepository.getOne({ email: data.email });
    if (!user) { return false; }
    if (PasswordHash.verify(data.password, user.password)) {
      const token = jwt.sign({ xcvio: user.id });
      await userRepository.update({ _id: user.id }, { auth_tokens: [token] });
      const companyUser = await companyUserRepository.getCompanyUser({ user: user.id });
      if (companyUser) {
        user.set('company', companyUser.company, { strict: false });
      }
      return {
        token,
        user,
      };
    }
    return false;
  } catch (e) {
    Logger.error(e);
    return false;
  }
};
