import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  app: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  secret: {
    type: String,
    required: true,
  },
  last_used: {
    type: Date,
    required: false,
  },
  deleted_at: {
    type: Date,
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

const ApiKey = model('ApiKey', schema, 'api_keys');
