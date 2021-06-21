import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    type: String,
    unique: true,
  },
  phone_no: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  phone_no_verified: {
    type: Boolean,
    default: false,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  auth_tokens: Array,
  email_verification_code: String,
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
    delete ret.password;
    delete ret.auth_tokens;
    delete ret.phone_no_verification_code;
    delete ret.email_verification_token;
    delete ret.__v;
    ret.id = ret._id;
    delete ret._id;
    return ret;
  },
});
const UserBase = mongoose.model('User', schema);

export default class User extends UserBase { }
