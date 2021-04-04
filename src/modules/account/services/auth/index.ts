import UserRepository from '../../repositories/UserRepository';
import login from './login';

const userRepository = new UserRepository();

export default {
  login: login(userRepository),
};
