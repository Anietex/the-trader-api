import AppRepository from '@/modules/company/repositories/AppRepository';
import AppSettingRepository from '@/modules/company/repositories/AppSettingRepository';
import createApp from './create-app';
import listApps from './list-apps';
import deleteApp from './delete-app';

const appRepository = new AppRepository();
const appSettingRepository = new AppSettingRepository();

export default {
  createApp: createApp(appRepository, appSettingRepository),
  listApps: listApps(appRepository),
  deleteApp: deleteApp(appRepository),
};
