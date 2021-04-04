import Logger from '../utils/logger';

export default abstract class BaseController {
  protected success = (data: any, message: string = '') => ({
    status: 'success',
    data,
    message,
  })

  protected error = (message: string, data: any = null) => {
    const response = {
      status: 'failed',
      data,
      message,
    };

    Logger.error(message);

    return response;
  }
}
