import VerifyEmailNotification from '@/modules/account/notifications/VerifyEmailNotification';
import UserRepository from '@/modules/account/repositories/UserRepository';
import AccountVerificationCodeRepository from '@/modules/account/repositories/AccountVerificationCodeRepository';
import cryptoRandomString from '@/app/utils/crypto-random-string';
import Notification from '@/core/notification/Notification';

/**
 *
 * @param userRepository
 * @param accountVerificationRepo
 */
export default (userRepository: UserRepository,
  // eslint-disable-next-line max-len
  accountVerificationRepo: AccountVerificationCodeRepository) => async (data: {user_id: string}) => {
  try {
    const user = await userRepository.getUser({ _id: data.user_id });
    if (user.email_verified) {
      return Promise.reject('Email already verified');
    }

    // @ts-ignore
    const verificationCode = cryptoRandomString({ length: 6, type: 'numeric' });

    // Create verification record to keep track
    await accountVerificationRepo.create({
      user: user.id,
      code: verificationCode,
    });

    // Create notification
    const verificationEmail = new VerifyEmailNotification({
      email: user.email,
      verification_code: verificationCode,
    });
    // Send Email
    Notification.send(verificationEmail);

    return Promise.resolve('Email verification code resent successfully');
  } catch (e) {
    return Promise.reject(e);
  }
};
