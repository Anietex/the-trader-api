import { body } from 'express-validator';

export default () => [

  body('email', 'Email is required').exists(),
  body('password', 'Password is required').exists(),
];
