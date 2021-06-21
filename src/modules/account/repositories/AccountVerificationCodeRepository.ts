import BaseRepository from '@/modules/BaseRepository';
import AccountVerificationCode from '@/modules/account/models/AccountVerificationCode';

export default class AccountVerificationCodeRepository extends BaseRepository {
  constructor() {
    super();
    this.Model = AccountVerificationCode;
  }
}
