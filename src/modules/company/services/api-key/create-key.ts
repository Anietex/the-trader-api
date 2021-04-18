import ApiKeyRepository from '@/modules/company/repositories/ApiKeyRepository';
import randomstring from 'randomstring';
import PasswordHash from '@/app/utils/password-hash';
import Logger from '@/app/utils/logger';

export default (apiKeyRepository: ApiKeyRepository) => async (data: any) => {
  try {
    const key = randomstring.generate({
      length: 20,
      charset: 'alphabetic',
    });
    const secret = randomstring.generate({
      length: 36,
      charset: 'alphabetic',
    });
    const hashedSecret = PasswordHash.hash(secret);
    const apiKey = await apiKeyRepository.create({
      app: data.app_id,
      env: data.environment,
      key,
      secret: hashedSecret,
      created_by: data.user,
    });
    return {
      id: apiKey.id,
      key: apiKey.key,
      secret,
      status: apiKey.status,
    };
  } catch (e) {
    Logger.error('-- Error Creating API key --');
    Logger.error(e);
    return false;
  }
};
