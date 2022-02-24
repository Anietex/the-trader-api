import BybitAPI from '@/core/services/BybitAPI';

export default (bybitAPI: BybitAPI) => async () => {
  const symbols = await bybitAPI.getAllSymbols();

  const balance = await bybitAPI.getWalletBalance();

  // console.log(JSON.stringify(balance));

  return symbols.result;
};
