import AccountVerificationCodeRepository from '@/modules/account/repositories/AccountVerificationCodeRepository';
import UserRepository from '../../repositories/UserRepository';
import createUser from './create-user';

const userRepository = new UserRepository();
const accountVerificationCodeRepository = new AccountVerificationCodeRepository();
export default {
  createUser: createUser(userRepository, accountVerificationCodeRepository),
};
