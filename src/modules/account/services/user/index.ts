import UserRepository from '../../repositories/UserRepository';
import createUser from './create-user';

const userRepository = new UserRepository();

export default {
  createUser: createUser(userRepository),
};
