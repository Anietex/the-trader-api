import BybitAPI from '@/core/services/BybitAPI';
import getAllSymbols from './get-all-symbols';

const bybitAPI = new BybitAPI();

export default {
  getAllSymbols: getAllSymbols(bybitAPI),
};
