import AppSetting from '../models/AppSetting';
import BaseRepository from '../../BaseRepository';

export default class AppSettingRepository extends BaseRepository {
  Model = AppSetting;
}
