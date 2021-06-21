import { body } from 'express-validator';
import UserRepository from '../repositories/UserRepository';

const userRepository = new UserRepository();

export default () => [
  body('verification_code', 'verification code is required')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('user_id', 'user id is required')
    .trim()
    .exists({ checkFalsy: true })
    .bail()
    .custom(async (userId) => {
      try {
        const user = await userRepository.getUser({ _id: userId });
        if (!user) return Promise.reject('Invalid user id');
      } catch (e) {
        return Promise.reject('Invalid user id');
      }
      return true;
    }),

];
