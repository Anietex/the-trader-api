import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  code: {
    required: true,
    type: String,
  },
  status: {
    type: String,
    enum: ['completed', 'pending', 'expired'],
  },
}, {
  timestamps:
    {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
});

const AccountVerificationCode = mongoose.model('AccountVerificationCode', schema, 'account_verification_codes');

export default AccountVerificationCode;
