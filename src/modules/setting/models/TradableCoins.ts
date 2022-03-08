import mongoose, { Schema, model } from 'mongoose';

const schema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  symbol_pairs: {
    type: Schema.Types.Array,
    required: true,
  },
},
{
  timestamps:
      {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
});

const TradableCoins = model('TradableCoins', schema);

export default TradableCoins;
