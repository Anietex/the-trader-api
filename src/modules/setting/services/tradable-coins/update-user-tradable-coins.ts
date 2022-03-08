import TradableCoinRepository from '@/modules/setting/repository/TradableCoinRepository';

export default (tradableCoinRepository: TradableCoinRepository) => async (data: any) => {
  try {
    const tradablePair = await tradableCoinRepository.updateTradableCoins(data);
    if (!tradablePair) {
      return [];
    }
    return tradablePair.symbol_pairs;
  } catch (e) {
    return Promise.reject(e);
  }
};
