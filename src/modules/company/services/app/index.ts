import AppRepository from '@/modules/company/repositories/AppRepository';
import AppSettingRepository from '@/modules/company/repositories/AppSettingRepository';
import createApp from './create-app';
import listApps from './list-apps';

const appRepository = new AppRepository();
const appSettingRepository = new AppSettingRepository();

export default {
  createApp: createApp(appRepository, appSettingRepository),
  listApps: listApps(appRepository),
};
