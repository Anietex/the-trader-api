import BaseRepository from '@/modules/BaseRepository';
import ApiKey from '@/modules/company/models/ApiKey';
import cryptoRandomString from 'crypto-random-string';
import PasswordHash from '@/utils/password-hash';

export default class ApiKeyRepository extends BaseRepository {
  Model = ApiKey;
}
