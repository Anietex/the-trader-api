import AppRepository from '@/modules/company/repositories/AppRepository';
import Logger from '@/app/utils/logger';
import AppSettingRepository from '@/modules/company/repositories/AppSettingRepository';

/**
 * Creates app and app settings
 * @param appRepository
 * @param appSettingRepository
 */
export default (appRepository: AppRepository,
  appSettingRepository: AppSettingRepository) => async (data: any): Promise<any> => {
  try {
    // Create app
    const app = await appRepository.create({
      name: data.name,
      company: data.company_id,
      created_by: data.user_id,
    });

    // Create app settings
    const appSetting = await appSettingRepository.create({
      app: app.id,
      accepted_coins: data.accepted_coins,
    });

    // Fetch app with app settings
    return appRepository.getApp({ _id: app.id });
  } catch (e) {
    Logger.error('-- Error Creating app --');
    Logger.error(e);
    return false;
  }
};
