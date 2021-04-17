import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  app: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  accepted_coins: {
    type: Schema.Types.Array,
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

const AppSetting = model('AppSetting', schema, 'apps_setting');

export default AppSetting;
