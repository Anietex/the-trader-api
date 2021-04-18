import AppRepository from '@/modules/company/repositories/AppRepository';
import Logger from '@/app/utils/logger';

export default (appRepository: AppRepository) => async (criteria: any) => {
  try {
    const apps = await appRepository.getApps(criteria);
    return apps.map((app) => {
      const apiKeys = app.api_keys.map((key: any) => ({
        id: key._id,
        env: key.env,
        status: key.status,
        key: key.key,
        secret: new Array(36).fill('*').join(''),
      }));

      const testApiKeys = apiKeys.filter((key: any) => key.env === 'test');
      const prodApiKeys = apiKeys.filter((key: any) => key.env === 'production');
      return {
        name: app.name,
        created_by: {
          name: `${app.created_by.first_name} ${app.created_by.last_name}`,
          email: app.created_by.email,
        },
        api_key: {
          test: testApiKeys,
          production: prodApiKeys,
        },
      };
    });
  } catch (e) {
    Logger.error('-- Error fetching app --');
    Logger.error(e);
    return false;
  }
};
