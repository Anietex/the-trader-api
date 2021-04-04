import authService from '../services/auth';
import userService from '../services/user';
import Logger from '../../../utils/logger';

describe('Auth Service', () => {
  it('Should Login User with correct password', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@mail.test',
      password: 'password',
    };
    const user = await userService.createUser(userData);

    const authData = await authService.login({
      email: userData.email,
      password: userData.password,
    });
    expect(Object.keys(authData)).toEqual(expect.arrayContaining(['token', 'user']));
  });

  it('substract', () => {
    const result = 3;
    expect(result).toBe(3);
  });
});
