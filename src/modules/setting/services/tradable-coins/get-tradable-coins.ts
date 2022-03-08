import TradableCoinRepository from '@/modules/setting/repository/TradableCoinRepository';

export default (tradableCoinRepository: TradableCoinRepository) => async (userId: string) => {
  const user = null;
  try {
    const coins = await tradableCoinRepository.getTradableCoins(userId);

    if (!coins) {
      return [];
    }
    return coins.symbol_pairs;
  } catch (e) {
    return Promise.reject(e);
  }
};
