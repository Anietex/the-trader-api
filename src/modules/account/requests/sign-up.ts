import { body } from 'express-validator';
import UserRepository from '../repositories/UserRepository';

const userRepository = new UserRepository();

export default () => [
  body('first_name')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('last_name')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('email', 'A valid email is required')
    .isEmail()
    .custom(async (email) => {
      const user = await userRepository.getUser({ email });
      if (user) return Promise.reject('Email already exist');
      return true;
    }),
  body('password_confirmation')
    .custom((password, { req }) => {
      if (password !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
];
