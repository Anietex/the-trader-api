import TradableCoinRepository from '../../repository/TradableCoinRepository';
import getTradableCoins from './get-tradable-coins';
import updateUserTradableCoins from './update-user-tradable-coins';

const tradableCoinRepo = new TradableCoinRepository();

export default {
  getTradableCoins: getTradableCoins(tradableCoinRepo),
  updateUserTradableCoins: updateUserTradableCoins(tradableCoinRepo),
};
