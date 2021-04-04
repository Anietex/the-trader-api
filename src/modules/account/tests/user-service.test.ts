import userService from '../services/user';

describe('User Service', () => {
  it('Should Create User', async () => {
    const userData = {
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@mail.test',
      password: 'password',
    };
    const user = await userService.createUser(userData);
    // @ts-ignore
    delete userData.password;
    expect(user).toEqual(expect.objectContaining(userData));
  });
});
