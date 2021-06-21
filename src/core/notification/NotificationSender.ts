import BaseNotification from '@/core/notification/contracts/BaseNotification';
import channels from './channels';

class NotificationSender {
  public send = async (notification: BaseNotification) => {
    const notificationChannels = notification.channels();
    for (let i = 0; i <= notificationChannels.length; i += 1) {
      const channel = channels[notificationChannels[i]];
      if (channel) {
        channel.send(notification);
      }
    }
  }
}
export default NotificationSender;
