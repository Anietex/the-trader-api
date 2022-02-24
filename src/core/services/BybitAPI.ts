import crypto from 'crypto';
import http from '@/core/services/Http';

class BybitAPI {
  private getSignature(parameters: Object, secret: string) {
    let orderedParams = '';
    Object.keys(parameters).sort().forEach((key: string) => {
      // @ts-ignore
      orderedParams += `${key}=${parameters[key]}&`;
    });
    orderedParams = orderedParams.substring(0, orderedParams.length - 1);

    return crypto.createHmac('sha256', secret).update(orderedParams).digest('hex');
  }

  public async getAllSymbols() {
    try {
      const { data } = await http.get('/spot/v1/symbols');
      return data;
    } catch (e) {
      return e;
    }
  }

  public async getLastTradedPrices() {
    try {
      const { data } = await http.get('/spot/quote/v1/ticker/price');
      return data;
    } catch (e) {
      return e;
    }
  }

  public async getWalletBalance() {
    try {
      const requestParams = this.buildRequestParams();
      const { data } = await http.get('/spot/v1/account', {
        params: requestParams,
      });
      return data;
    } catch (e) {
      return e;
    }
  }

  private buildRequestParams(data: Object = {}) {
    const apiKey: string = process.env.BYBIT_API_KEY!;
    const secret: string = process.env.BYBIT_API_SECRET!;
    const timestamp: number = Date.now();
    const params = {
      api_key: apiKey,
      ...data,
      timestamp,
    };

    const sign = this.getSignature(params, secret);

    return { ...params, sign };
  }
}

export default BybitAPI;
