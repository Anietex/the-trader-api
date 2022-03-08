import { body } from 'express-validator';

export default () => [
  body('symbol_pairs')
    .exists({ checkFalsy: true })
    .withMessage('Symbol pairs is required')
    .bail()
    .isArray({ min: 1 })
    .withMessage('Symbol pair must be an array'),
];
