import { body } from 'express-validator';

export default () => [
  body('name')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('phone_no')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('country')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
  body('user_id')
    .exists({ checkFalsy: true })
    .trim()
    .escape(),
];
