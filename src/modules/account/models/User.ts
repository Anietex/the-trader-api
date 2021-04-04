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
  phone_no_verified: Boolean,
  email_verified: Boolean,
  auth_tokens: Array,
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
    return ret;
  },
});
const User = mongoose.model('User', schema);

export default User;
