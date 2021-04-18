import { validationResult } from 'express-validator';
import { Request, Response } from 'express';

export default (req: Request, res:Response, next: any) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: object[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));

  return res.status(422).json({
    status: 'failed',
    message: 'Validation error occurred',
    data: { errors: extractedErrors },
  });
};
