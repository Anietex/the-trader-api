import appService from '@/modules/company/services/app';
import apiKeyService from '../services/api-key';
import companyService from '../services/company';
import userService from '../../account/services/user';

describe('API key service', () => {
  it('Should create API keys', async () => {
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
    const apiKey = await apiKeyService.createKey({
      environment: 'test',
      app_id: app._id,
      user,
    });
    expect(apiKey).toHaveProperty('key');
    expect(apiKey).toHaveProperty('secret');
  });
});
