import userService from '@/modules/account/services/user';
import Logger from '@/utils/logger';
import appService from '../services/app';
import companyService from '../services/company';
import apiKeyService from '../services/api-key';

describe('App Service', () => {
  it('Should create app', async () => {
    const user = await userService.createUser({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@mail.test',
      password: 'password',
    });

    const company = await companyService.createCompany({
      name: 'BitTrader',
      user_id: user.id,
    });

    const app = await appService.createApp({
      name: 'Bitrader App',
      company_id: company.id,
      user_id: user.id,
      accepted_coins: [],
    });

    expect(app).toEqual(expect.objectContaining({
      name: 'Bitrader App',
    }));
  });
});
