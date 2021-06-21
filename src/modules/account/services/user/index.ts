import AccountVerificationCodeRepository from '@/modules/account/repositories/AccountVerificationCodeRepository';
import UserRepository from '../../repositories/UserRepository';
import createUser from './create-user';
import verifyEmail from './verify-email';
import resendEmailVerification from './resend-email-verification';

const userRepository = new UserRepository();
const accountVerificationCodeRepository = new AccountVerificationCodeRepository();
export default {
  createUser: createUser(userRepository, accountVerificationCodeRepository),
  verifyEmail: verifyEmail(userRepository, accountVerificationCodeRepository),
  // eslint-disable-next-line max-len
  resendEmailVerification: resendEmailVerification(userRepository, accountVerificationCodeRepository),
};
