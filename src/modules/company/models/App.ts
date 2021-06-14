import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Company',
  },
  created_by: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
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

const AppBase = model('App', schema);

export default class App extends AppBase {}
