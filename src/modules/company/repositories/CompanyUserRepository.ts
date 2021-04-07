import CompanyUser from '../models/CompanyUser';
import BaseRepository from '../../BaseRepository';

export default class CompanyUserRepository extends BaseRepository {
  protected Model = CompanyUser;

  getCompanyUser(criteria: Object) {
    return this.Model.findOne(criteria).populate('company');
  }
}
