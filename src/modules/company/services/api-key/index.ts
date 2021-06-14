import ApiKeyRepository from '@/modules/company/repositories/ApiKeyRepository';
import createKey from './create-key';

const apiKeyRepository = new ApiKeyRepository();

export default {
  createKey: createKey(apiKeyRepository),
};
