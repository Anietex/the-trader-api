import BybitAPI from '@/core/services/BybitAPI';
import getAllSymbols from './get-all-symbols';
import getLastTradedPrice from './get-last-traded-price';

const bybitAPI = new BybitAPI();

export default {
  getAllSymbols: getAllSymbols(bybitAPI),
  getLastTradedPrice: getLastTradedPrice(bybitAPI),
};
