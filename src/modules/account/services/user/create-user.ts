import Logger from '../../../../app/utils/logger';
import UserRepository from '../../repositories/UserRepository';

export default (userRepository: UserRepository) => async (data: any) => {
  try {
    const user = await userRepository.create(data);
    return user;
  } catch (e) {
    return Promise.reject(e);
  }
};
