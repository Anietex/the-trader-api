import UserRepository from '../../repositories/UserRepository';
import Logger from '../../../../utils/logger';
import PasswordHash from '../../../../utils/password-hash';
import jwt from '../../../../utils/jwt';

export default (userRepository: UserRepository) => async (data: any) => {
  try {
    const user = await userRepository.get({ email: data.email });

    if (!user) {
      return false;
    }

    if (PasswordHash.verify(data.password, user.password)) {
      const token = jwt.sign({ xcvio: user.id });

      await userRepository.update({ _id: user.id }, { auth_tokens: [token] });

      return {
        token,
        user,
      };
    }
    return false;
  } catch (e) {
    Logger.error(e);
    return false;
  }
};
