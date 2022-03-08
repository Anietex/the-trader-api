import BaseRepository from '@/modules/BaseRepository';
import TradableCoins from '../models/TradableCoins';

export default class TradableCoinRepository extends BaseRepository {
    Model = TradableCoins

    getTradableCoins = (userId: string) => this.getOne({ user_id: userId })

    updateTradableCoins = async (data: any) => TradableCoins
      .findOneAndUpdate(
        { user_id: data.user_id },
        { symbol_pairs: data.symbol_pairs },
        { new: true, upsert: true },
      )
}
