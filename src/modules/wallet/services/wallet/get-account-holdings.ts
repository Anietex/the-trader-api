import BybitAPI from '@/core/services/BybitAPI';

export default (bybitAPI: BybitAPI) => async () => {
  const holdings = await bybitAPI.getWalletBalance();

  return holdings.result.balances;
};
