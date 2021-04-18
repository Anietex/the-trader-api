import jwt from '@/app/utils/jwt';
import UserRepository from '@/modules/account/repositories/UserRepository';
import { Request, Response } from 'express';

export default async (req: Request, res : Response, next: Function) => {
  const { authorization } = req.headers;

  if (authorization) {
    const token = authorization.replace('Bearer ', ''); // Bearer <token>

    try {
      const result = jwt.verify(token);
      const userId = result.data.xcvio;
      const user = await (new UserRepository()).getUser({ _id: userId });

      if (!user) {
        return res.status(401).json({
          status: 'failed',
          message: 'Unauthorized - Authenticated user not found',
          data: null,
        });
      }
      // @ts-ignore
      req.user = user;
      req.body.auth_user = user;
      next();
    } catch (e) {
      return res.status(401).json({
        status: 'failed',
        message: 'Unauthorized',
        data: null,
      });
    }
  } else {
    return res.status(401).json({
      status: 'failed',
      message: 'Unauthorized - No token provided',
      data: null,
    });
  }
};
