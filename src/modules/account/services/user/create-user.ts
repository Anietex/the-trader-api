// import Notification from '@/core/notification/Notification';
import VerifyEmailNotification from '@/modules/account/notifications/VerifyEmailNotification';
import cryptoRandomString from '@/app/utils/crypto-random-string';
import AccountVerificationCodeRepository from '@/modules/account/repositories/AccountVerificationCodeRepository';
import UserRepository from '../../repositories/UserRepository';

export default (userRepository: UserRepository,
  verificationCodeRepo: AccountVerificationCodeRepository) => async (data: any) => {
  let user = null;
  try {
    // Create User
    user = await userRepository.create(data);
    // @ts-ignore
    const verificationCode = cryptoRandomString({ length: 6, type: 'numeric' });

    // Create verification record to keep track
    await verificationCodeRepo.create({
      user: user.id,
      code: verificationCode,
    });

    // Create notification
    const verificationEmail = new VerifyEmailNotification({
      email: user.email,
      verification_code: verificationCode,
    });
    // Send Email
    // Notification.send(verificationEmail);

    return user;
  } catch (e) {
    if (user) {
      await userRepository.delete({ _id: user._id });
    }
    return Promise.reject(e);
  }
};
