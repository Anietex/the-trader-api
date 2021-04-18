import mongoose from 'mongoose';
import App from '../models/App';
import BaseRepository from '../../BaseRepository';

export default class AppRepository extends BaseRepository {
  Model = App;

  async getApp(criteria: any) {
    const filter = { ...criteria };
    if (filter._id) {
      filter._id = mongoose.Types.ObjectId(filter._id);
    }
    let app = await this.Model.aggregate(
      [
        { $match: filter },
        {
          $lookup: {
            from: 'apps_setting',
            localField: '_id',
            foreignField: 'app',
            as: 'app_setting',
          },
        },
        {
          $lookup: {
            from: 'api_keys',
            localField: '_id',
            foreignField: 'app',
            as: 'api_keys',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by',
          },
        },
        { $unwind: { path: '$app_setting', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$created_by', preserveNullAndEmptyArrays: true } },
        { $limit: 1 },
      ],
    );

    if (app) {
      app = { ...app[0] };
      return app;
    }

    return null;
  }

  public getApps(criteria: any) {
    return this.Model.aggregate(
      [
        { $match: criteria },
        {
          $lookup: {
            from: 'apps_setting',
            localField: '_id',
            foreignField: 'app',
            as: 'app_setting',
          },
        },
        {
          $lookup: {
            from: 'api_keys',
            localField: '_id',
            foreignField: 'app',
            as: 'api_keys',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'created_by',
            foreignField: '_id',
            as: 'created_by',
          },
        },
        { $unwind: { path: '$app_setting', preserveNullAndEmptyArrays: true } },
        { $unwind: { path: '$created_by', preserveNullAndEmptyArrays: true } },
      ],
    );
  }
}
