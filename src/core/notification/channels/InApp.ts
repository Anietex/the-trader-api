import Channel from '@/core/notification/channels/Channel';
import BaseNotification from '@/core/notification/contracts/BaseNotification';

class InApp implements Channel {
  send = (notification: BaseNotification): void => {
  }
}

export default InApp;
