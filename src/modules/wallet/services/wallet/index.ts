import BybitAPI from '@/core/services/BybitAPI';
import getAccountHoldings from './get-account-holdings';

const bybitAPI = new BybitAPI();

export default {
  getAccountHoldings: getAccountHoldings(bybitAPI),
};
