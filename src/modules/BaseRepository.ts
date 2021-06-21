import { Model } from 'mongoose';

/**
 * Base Repository
 */
export default abstract class BaseRepository {
   protected Model: Model<any> = Model

   public create(data: any): Promise<any> {
     const document = new this.Model(data);
     return document.save();
   }

   public update(criteria: any, data: any): Promise<any> {
     const updateData = { ...data };
     // @ts-ignore
     return this.Model.findOneAndUpdate(criteria, updateData, { new: true, runValidator: false });
   }

   public getOne(criteria: any, withTrash = false): Promise<any> {
     let filter = {};
     if (withTrash) {
       filter = {
         ...criteria,
       };
     } else {
       filter = {
         ...criteria,
         deleted_at: null,
       };
     }
     // @ts-ignore
     return this.Model.findOne(filter);
   }

   public getAll(criteria: any, withTrash = false): Promise<any> {
     let filter = {};
     if (withTrash) {
       filter = { ...criteria };
     } else {
       filter = {
         ...criteria,
         deleted_at: null,
       };
     }
     // @ts-ignore
     return this.Model.find(filter);
   }

   public getPaginated(criteria: any): Promise<any> {
     return Promise.resolve(undefined);
   }

   // eslint-disable-next-line consistent-return
   public async delete(criteria: Object, softDelete : boolean = false) {
     if (softDelete) {
       const doc = await this.getOne(criteria);
       if (!doc) return false;
       if (doc.deleted_at) {
         return false;
       }
       const updated = await this.update(criteria, { deleted_at: new Date() });
       if (updated) {
         return true;
       }
     } else {
       const deleteResult = await this.Model.deleteMany(criteria);
       if (deleteResult) {
         return deleteResult.deletedCount ? deleteResult.deletedCount > 0 : false;
       }
     }
   }
}
