import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export default {

  sign(payload: any, expiresIn = '240h') {
    // @ts-ignore
    return jwt.sign({ data: payload }, process.env.JWT_SECRET, { expiresIn });
  },

  verify(token: string) {
    // @ts-ignore
    return jwt.verify(token, process.env.JWT_SECRET);
  },

};
