import User from '../models/User';

import PasswordHash from '../../../utils/password-hash';
import BaseRepository from '../../BaseRepository';

export default class UserRepository extends BaseRepository {
  Model = User;

  getUser = async (criteria: any) => {
    const user = this.Model.findOne(criteria);
    return user;
  }

  create = async (data: any): Promise<any> => {
    const userData = { ...data };
    userData.password = await PasswordHash.hash(userData.password);
    return super.create(userData);
  }

  update = (criteria: any, data: any): Promise<any> => {
    const userData = data;
    if (userData.password) {
      userData.password = PasswordHash.hash(data.password);
    }

    return super.update(criteria, data);
  }
}
