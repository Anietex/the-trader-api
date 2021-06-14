import userService from '@/modules/account/services/user';
import companyService from '../services/company';

describe('Company Service', () => {
  it('Should create company', async () => {
    const user = await userService.createUser({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@mail.test',
      password: 'password',
    });
    const companyData = {
      name: 'BitTrader',
      user_id: user.id,
      phone_no: '089884499404',
    };
    const company = await companyService.createCompany(companyData);
    expect(company.name).toEqual(companyData.name);
  });
});
