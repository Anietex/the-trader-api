import moment from 'moment';
import UserRepository from '@/modules/account/repositories/UserRepository';
import AccountVerificationCodeRepository from '@/modules/account/repositories/AccountVerificationCodeRepository';

export default (userRepository: UserRepository,
  accountVerificationRepo: AccountVerificationCodeRepository) => async (data: {
    verification_code: string,
    user_id: string
  }) => {
  try {
    // Fetch the verification code
    const verification = await accountVerificationRepo.getOne({
      code: data.verification_code,
      user: data.user_id,
    });

    // Throw error if it does not exist
    if (!verification) {
      return Promise.reject('Invalid email verification code');
    }

    if (verification.status === 'completed') {
      return Promise.reject('Email already verified');
    }

    // Throw error if it has expired
    const sentAt = moment(verification.created_at);
    const now = moment();
    if (now.diff(sentAt, 'minute') > 10) {
      return Promise.reject('Email verification code has expired');
    }

    // Update record to verify user
    await userRepository.update({ _id: data.user_id }, { _id: data.user_id, email_verified: true });
    await accountVerificationRepo.update({ user: data.user_id }, { status: 'completed' });

    return Promise.resolve('Email verified successfully');
  } catch (e) {
    return Promise.reject(e);
  }
};
