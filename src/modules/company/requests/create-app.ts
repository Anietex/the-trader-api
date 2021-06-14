import { body } from 'express-validator';

export default () => [
  body('name')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('accepted_coins')
    .exists({ checkFalsy: true })
    .isArray({ min: 1 }),
];
