import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  country: {
    type: Schema.Types.ObjectId,
    required: false,
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
      phone_no: ret.phone_no,
      country: ret.country,
      status: ret.status,
    };
  },
});

const Company = model('Company', schema);

export default Company;
