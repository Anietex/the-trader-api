import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  },
  user: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  status: {
    type: String,
    enum: ['active', 'disabled'],
    default: 'active',
  },
  permissions: {
    type: Array,
    required: false,
  },
},
{
  timestamps:
  {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

const CompanyUser = model('CompanyUser', schema, 'company_users');

export default CompanyUser;
