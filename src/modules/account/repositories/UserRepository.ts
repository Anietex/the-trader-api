import User from '../models/User';

import PasswordHash from '../../../utils/password-hash';
import BaseRepository from '../../BaseRepository';

export default class UserRepository implements BaseRepository {
  getUser = async (criteria: any) => User.findOne(criteria)

  create = async (data: any): Promise<any> => {
    const userData = { ...data };
    userData.password = await PasswordHash.hash(userData.password);
    const user = new User(userData);

    return user.save();
  }

  get = (criteria: any) : Promise<any> => User.findOne(criteria)

  getAll = (criteria: any = {}): Promise<any> => User.find(criteria)

  getPaginated = (criteria: any): Promise<any> => Promise.resolve(undefined)

  update= (criteria: any, data: any): Promise<any> => {
    const userData = data;
    if (userData.password) {
      userData.password = PasswordHash.hash(data.password);
    }

    // @ts-ignore
    return User.findOneAndUpdate(criteria, data, { new: true, runValidator: false });
  }
}
