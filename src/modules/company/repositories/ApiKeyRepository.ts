import BaseRepository from '@/modules/BaseRepository';
import ApiKey from '@/modules/company/models/ApiKey';

export default class ApiKeyRepository extends BaseRepository {
  Model = ApiKey;
}
