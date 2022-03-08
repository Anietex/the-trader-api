import BybitAPI from '@/core/services/BybitAPI';

export default (bybitAPI: BybitAPI) => async () => {
  const lastTradedPrice = await bybitAPI.getLastTradedPrices();

  return lastTradedPrice.result;
};
