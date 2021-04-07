import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
  },
},
{
  timestamps:
      {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
});

schema.set('toJSON', {
  transform(doc: any, ret:any, opt: any) {
    return {
      id: ret._id,
      name: ret.name,
      status: ret.status,
    };
  },
});

const Company = model('Company', schema);

export default Company;
