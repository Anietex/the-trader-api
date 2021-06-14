import AppRepository from '@/modules/company/repositories/AppRepository';
import Logger from '@/app/utils/logger';

export default (appRepository: AppRepository) => async (criteria : any) => {
  try {
    return await appRepository.delete(criteria, true);
  } catch (e) {
    Logger.error('-- Error deleting App --');
    Logger.error(e);
    return false;
  }
};
