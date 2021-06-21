import Channel from '@/core/notification/channels/Channel';
import BaseNotification from '@/core/notification/contracts/BaseNotification';

class SMS implements Channel {
  send = (notification: BaseNotification): void => {
  }
}
export default SMS;
